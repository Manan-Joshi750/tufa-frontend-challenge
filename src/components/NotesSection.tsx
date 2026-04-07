interface NotesSectionProps {
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function NotesSection({ notes, onChange }: NotesSectionProps) {
  return (
    <div className="flex flex-col h-full min-h-[250px]">
      <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-widest">
        Notes
      </h3>
      <textarea
        value={notes}
        onChange={onChange}
        placeholder="Type your notes here..."
        className="flex-grow w-full resize-none outline-none text-sm text-gray-700 bg-transparent"
        style={{
          lineHeight: '2.5rem',
          backgroundImage: 'linear-gradient(transparent, transparent calc(2.5rem - 1px), #e5e7eb 0px)',
          backgroundSize: '100% 2.5rem',
        }}
      />
    </div>
  );
}