import { render, screen } from '@testing-library/react';
import { Awards, Certifications, Seminars } from './Credentials';

describe('Credentials Components', () => {
  beforeEach(() => {
    render(
      <>
        <Awards />
        <Certifications />
        <Seminars />
      </>,
    );
  });

  it('renders the individual sections', () => {
    expect(document.querySelector('#awards')).toBeInTheDocument();
    expect(document.querySelector('#certifications')).toBeInTheDocument();
    expect(document.querySelector('#seminars')).toBeInTheDocument();
  });

  it('renders all award titles', () => {
    expect(screen.getByText('Capture The Flag')).toBeInTheDocument();
    expect(screen.getByText('Global Cyber Skills Benchmark')).toBeInTheDocument();
    expect(screen.getByText('Hybrid Game Development')).toBeInTheDocument();
    expect(screen.getByText('Cybersecurity Quiz Bee')).toBeInTheDocument();
    expect(screen.getByText('General IT Quiz Bee')).toBeInTheDocument();
    expect(screen.getByText("Dean's List Academic Excellence")).toBeInTheDocument();
  });

  it('renders all certification and seminar titles', () => {
    expect(screen.getByText('Google Cybersecurity Professional')).toBeInTheDocument();
    expect(screen.getByText('IBM and ISC2 Cybersecurity Specialist')).toBeInTheDocument();
    expect(screen.getByText('Visual Graphics Design NC III')).toBeInTheDocument();
    expect(
      screen.getByText('An Introduction to Programming the Internet of Things (IoT)'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Securing Connections/i)).toBeInTheDocument();
  });

  it('renders credential timestamps', () => {
    expect(screen.getAllByText('[MAR 2026]')[0]).toBeInTheDocument();
    expect(screen.getByText('[APR 2025]')).toBeInTheDocument();
    expect(screen.getByText('[NOV 2025]')).toBeInTheDocument();
    expect(screen.getByText('[2023 - 2026]')).toBeInTheDocument();
    expect(screen.getByText('[JAN 2026]')).toBeInTheDocument();
  });

  it('renders verification buttons for every credentialed item', () => {
    // 5 awards + 5 certifications open the verification modal
    expect(screen.getAllByText(/VIEW VERIFICATION/)).toHaveLength(10);
    // Dean's List award + 2 seminars use the certificate label
    expect(screen.getAllByText(/VIEW CERTIFICATE/)).toHaveLength(3);
  });
});
