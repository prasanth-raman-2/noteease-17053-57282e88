import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import NotesContainer from '~/components/notes/notes-container';

export default component$(() => {
  return (
    <NotesContainer />
  );
});

export const head: DocumentHead = {
  title: 'NoteEase - Your Simple Note Taking App',
  meta: [
    {
      name: 'description',
      content: 'A simple and intuitive notes application that allows you to create, edit, and organize your personal notes.',
    },
  ],
};
