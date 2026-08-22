import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  beforeEach(() => {
    render(<Projects />);
  });

  it('renders the projects section', () => {
    expect(document.querySelector('#projects')).toBeInTheDocument();
  });

  it('renders all project cards', () => {
    expect(screen.getByRole('heading', { level: 3, name: 'Agos' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Task-Buddy' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'PLV CEIT Library' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Survey System' })).toBeInTheDocument();
  });

  it('renders Live Demo links for every project', () => {
    expect(screen.getAllByText(/Live Demo/)).toHaveLength(4);
  });

  it('links source repositories', () => {
    expect(screen.getAllByText('Source')).toHaveLength(4);
  });
});
