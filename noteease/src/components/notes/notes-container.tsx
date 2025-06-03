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
  useStylesScoped$(`
    .container {
      display: flex;
      flex-direction: column;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      background-color: var(--secondary-color, #FFFFFF);
    }

    .searchBar {
      padding: 12px;
      margin-bottom: 16px;
      border: 2px solid var(--primary-color, #1976D2);
      border-radius: 8px;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
    }

    .categoriesContainer {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .categoryChip {
      padding: 8px 16px;
      background-color: var(--primary-color, #1976D2);
      color: var(--secondary-color, #FFFFFF);
      border: none;
      border-radius: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .categoryChip.active {
      background-color: var(--accent-color, #FFC107);
    }

    .notesList {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 80px;
    }

    .noteCard {
      background-color: var(--secondary-color, #FFFFFF);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      transition: box-shadow 0.2s;
      position: relative;
    }

    .noteCard:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .noteTitle {
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 8px 0;
      color: var(--primary-color, #1976D2);
    }

    .noteContent {
      font-size: 14px;
      color: #666;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 28px;
      background-color: var(--accent-color, #FFC107);
      color: var(--secondary-color, #FFFFFF);
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: transform 0.2s;
    }

    .fab:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      .container {
        padding: 16px;
      }
      
      .notesList {
        grid-template-columns: 1fr;
      }
    }
  `);

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
