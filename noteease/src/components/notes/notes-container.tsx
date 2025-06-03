import { component$, useSignal, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './notes.module.css';

// Types for our notes data
interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
}

export default component$(() => {
  useStylesScoped$(styles);

  // State for search term
  const searchTerm = useSignal('');
  
  // State for active category filter
  const activeCategory = useSignal('all');

  // Store for notes data
  const notesStore = useStore({
    notes: [
      {
        id: '1',
        title: 'Welcome to NoteEase',
        content: 'This is your first note. Click the + button to create more notes.',
        category: 'General'
      }
    ] as Note[],
    categories: ['all', 'General', 'Work', 'Personal'] as string[]
  });

  // Filter notes based on search term and category
  const filteredNotes = notesStore.notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesCategory = activeCategory.value === 'all' || note.category === activeCategory.value;
    return matchesSearch && matchesCategory;
  });

  return (
    <div class={styles.container}>
      {/* Search Bar */}
      <input
        type="text"
        class={styles.searchBar}
        placeholder="Search notes..."
        onInput$={(ev) => searchTerm.value = (ev.target as HTMLInputElement).value}
      />

      {/* Categories */}
      <div class={styles.categoriesContainer}>
        {notesStore.categories.map(category => (
          <button
            key={category}
            class={{
              [styles.categoryChip]: true,
              [styles.active]: activeCategory.value === category
            }}
            onClick$={() => activeCategory.value = category}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div class={styles.notesList}>
        {filteredNotes.map(note => (
          <div key={note.id} class={styles.noteCard}>
            <h3 class={styles.noteTitle}>{note.title}</h3>
            <p class={styles.noteContent}>{note.content}</p>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        class={styles.fab}
        onClick$={() => {
          // TODO: Implement note creation
          console.log('Create new note');
        }}
      >
        +
      </button>
    </div>
  );
});
