import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills', () => {
  beforeEach(() => {
    render(<Skills />);
  });

  it('renders the skills section', () => {
    expect(document.querySelector('#skills')).toBeInTheDocument();
  });

  it('renders all skill category groups', () => {
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('AI & RAG Engineering')).toBeInTheDocument();
    expect(screen.getByText('Frontend & UI Engineering')).toBeInTheDocument();
    expect(screen.getByText('Backend & Data Architecture')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Cybersecurity & Engineering Tools')).toBeInTheDocument();
  });

  it('renders specific skills with MaryUI, Filament, Java, and Docker', () => {
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('MaryUI')).toBeInTheDocument();
    expect(screen.getByText('Filament 4')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Burp Suite')).toBeInTheDocument();
  });

  it('renders modern Cloud, DevOps observability, and MCP skills', () => {
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('OpenTelemetry')).toBeInTheDocument();
    expect(screen.getByText('Jaeger Tracing')).toBeInTheDocument();
    expect(screen.getByText('Prometheus')).toBeInTheDocument();
    expect(screen.getByText('Grafana')).toBeInTheDocument();
    expect(screen.getByText('Render')).toBeInTheDocument();
    expect(screen.getByText('Railway')).toBeInTheDocument();
    expect(screen.getByText('Model Context Protocol (MCP)')).toBeInTheDocument();
  });
});
