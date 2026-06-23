import { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold, Italic, Heading2, Heading3, Quote, List, ListOrdered, Link2, Link2Off,
} from 'lucide-react';

import { portableTextToTiptap, tiptapToPortableText } from '../lib/portableTextTiptap';

/*
 * WYSIWYG body editor for the /admin blog editor.
 *
 * Edits with TipTap but speaks Portable Text to the rest of the app:
 *   - `value` is a Portable Text block array (loaded into the editor once, on mount)
 *   - `onChange` receives an updated Portable Text block array on every edit
 *
 * Restricted to exactly the styles/marks src/components/PortableTextBody.jsx renders
 * (h2/h3/blockquote/bullet/number/strong/em/link) so the editor can't produce output the
 * public site won't display. Lives in a code-split route, so TipTap never loads for visitors.
 */

// Inline TipTap content styling (scoped via arbitrary variants — no global CSS, no typography plugin).
const CONTENT_CLASSES = [
  'min-h-[18rem] px-4 py-3 focus:outline-none text-gray-700 text-base leading-relaxed',
  '[&_p]:my-3',
  '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3',
  '[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-5 [&_h3]:mb-2',
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1',
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1',
  '[&_blockquote]:border-l-4 [&_blockquote]:border-amber-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4',
  '[&_a]:text-blue-700 [&_a]:underline',
  '[&_strong]:font-semibold [&_strong]:text-gray-900',
].join(' ');

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        // Marks/blocks the public renderer doesn't support — keep them out of the editor.
        strike: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
        underline: false,
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
        },
      }),
    ],
    content: portableTextToTiptap(value),
    editorProps: { attributes: { class: CONTENT_CLASSES } },
    onUpdate: ({ editor }) => onChange(tiptapToPortableText(editor.getJSON())),
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes('link').href;
    const url = window.prompt('Adresse du lien (URL)', previous || 'https://');
    if (url === null) return; // cancelled
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:border-transparent" style={{ '--tw-ring-color': '#16508C' }}>
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} label="Gras"><Bold className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} label="Italique"><Italic className="w-4 h-4" /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} label="Titre 2"><Heading2 className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} label="Titre 3"><Heading3 className="w-4 h-4" /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} label="Liste à puces"><List className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} label="Liste numérotée"><ListOrdered className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} label="Citation"><Quote className="w-4 h-4" /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} label="Lien"><Link2 className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} label="Retirer le lien"><Link2Off className="w-4 h-4" /></ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({ onClick, active, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active || undefined}
      className={`p-2 rounded-md transition disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? 'bg-[#16508C] text-white' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-gray-300 mx-1" aria-hidden="true" />;
}
