/**
 * Conversion between Sanity Portable Text and TipTap (ProseMirror) document JSON.
 *
 * The blog editor at /admin edits posts with TipTap (WYSIWYG) but stores them as Portable
 * Text. These pure functions are the bridge. They are deliberately limited to the subset of
 * styles/marks that src/components/PortableTextBody.jsx renders, so what the editor produces
 * always displays correctly on the public site:
 *
 *   styles: normal | h2 | h3 | blockquote      lists: bullet | number      marks: strong | em | link
 *
 * Pure + framework-free so they can be unit-tested in node.
 */

function makeKey() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    }
  } catch {
    /* fall through */
  }
  return 'k' + Math.random().toString(36).slice(2, 12);
}

// --- Portable Text -> TipTap ----------------------------------------------

function spansToInline(block) {
  const markDefs = block.markDefs || [];
  return (block.children || [])
    .filter((span) => span && span._type === 'span')
    .map((span) => {
      const node = { type: 'text', text: span.text || '' };
      const marks = [];
      for (const mark of span.marks || []) {
        if (mark === 'strong') {
          marks.push({ type: 'bold' });
        } else if (mark === 'em') {
          marks.push({ type: 'italic' });
        } else {
          const def = markDefs.find((d) => d._key === mark);
          if (def && def._type === 'link' && def.href) {
            marks.push({
              type: 'link',
              attrs: {
                href: def.href,
                target: def.newWindow === false ? null : '_blank',
                rel: def.newWindow === false ? null : 'noopener noreferrer',
              },
            });
          }
        }
      }
      if (marks.length) node.marks = marks;
      return node;
    })
    .filter((n) => n.text.length > 0 || (n.marks && n.marks.length));
}

function paragraphNode(block) {
  const content = spansToInline(block);
  return content.length ? { type: 'paragraph', content } : { type: 'paragraph' };
}

/** Portable Text block array -> TipTap doc JSON (for loading a post into the editor). */
export function portableTextToTiptap(blocks) {
  const content = [];
  const arr = Array.isArray(blocks) ? blocks : [];

  let i = 0;
  while (i < arr.length) {
    const block = arr[i];
    if (!block || block._type !== 'block') { i++; continue; }

    // Group consecutive list items of the same kind into one list node.
    if (block.listItem === 'bullet' || block.listItem === 'number') {
      const kind = block.listItem;
      const items = [];
      while (
        i < arr.length &&
        arr[i] && arr[i]._type === 'block' && arr[i].listItem === kind
      ) {
        items.push({ type: 'listItem', content: [paragraphNode(arr[i])] });
        i++;
      }
      content.push({ type: kind === 'bullet' ? 'bulletList' : 'orderedList', content: items });
      continue;
    }

    // Group consecutive blockquote blocks into one blockquote node.
    if (block.style === 'blockquote') {
      const paras = [];
      while (
        i < arr.length &&
        arr[i] && arr[i]._type === 'block' && arr[i].style === 'blockquote' && !arr[i].listItem
      ) {
        paras.push(paragraphNode(arr[i]));
        i++;
      }
      content.push({ type: 'blockquote', content: paras });
      continue;
    }

    if (block.style === 'h2' || block.style === 'h3') {
      content.push({
        type: 'heading',
        attrs: { level: block.style === 'h2' ? 2 : 3 },
        content: spansToInline(block),
      });
    } else {
      content.push(paragraphNode(block));
    }
    i++;
  }

  // TipTap requires at least one node.
  if (content.length === 0) content.push({ type: 'paragraph' });
  return { type: 'doc', content };
}

// --- TipTap -> Portable Text ----------------------------------------------

function inlineToChildren(content) {
  const children = [];
  const markDefs = [];

  for (const node of content || []) {
    if (node.type !== 'text') continue;
    const marks = [];
    for (const mark of node.marks || []) {
      if (mark.type === 'bold') {
        marks.push('strong');
      } else if (mark.type === 'italic') {
        marks.push('em');
      } else if (mark.type === 'link' && mark.attrs?.href) {
        const key = makeKey();
        markDefs.push({
          _key: key,
          _type: 'link',
          href: mark.attrs.href,
          newWindow: mark.attrs.target === '_blank' || mark.attrs.target == null,
        });
        marks.push(key);
      }
    }
    children.push({ _type: 'span', _key: makeKey(), text: node.text || '', marks });
  }

  if (children.length === 0) {
    children.push({ _type: 'span', _key: makeKey(), text: '', marks: [] });
  }
  return { children, markDefs };
}

function makeBlock(style, content, listItem) {
  const { children, markDefs } = inlineToChildren(content);
  const block = { _type: 'block', _key: makeKey(), style, markDefs, children };
  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }
  return block;
}

/** TipTap doc JSON -> Portable Text block array (for saving a post). */
export function tiptapToPortableText(doc) {
  const blocks = [];
  const nodes = doc?.content || [];

  for (const node of nodes) {
    switch (node.type) {
      case 'heading': {
        const level = node.attrs?.level === 2 ? 'h2' : 'h3';
        blocks.push(makeBlock(level, node.content));
        break;
      }
      case 'blockquote': {
        for (const para of node.content || []) {
          blocks.push(makeBlock('blockquote', para.content));
        }
        break;
      }
      case 'bulletList':
      case 'orderedList': {
        const listItem = node.type === 'bulletList' ? 'bullet' : 'number';
        for (const item of node.content || []) {
          // A listItem wraps one (or more) paragraphs; flatten to one block each.
          for (const para of item.content || []) {
            if (para.type === 'paragraph') {
              blocks.push(makeBlock('normal', para.content, listItem));
            }
          }
        }
        break;
      }
      case 'paragraph':
      default: {
        // Drop genuinely empty paragraphs so blank lines don't pile up.
        const hasText = (node.content || []).some((n) => n.type === 'text' && (n.text || '').trim());
        if (hasText) blocks.push(makeBlock('normal', node.content));
        break;
      }
    }
  }

  return blocks;
}

/** True when a Portable Text body has at least one block with visible text. */
export function portableTextHasContent(blocks) {
  if (!Array.isArray(blocks)) return false;
  return blocks.some(
    (b) => b && b._type === 'block' && (b.children || []).some((s) => (s.text || '').trim()),
  );
}
