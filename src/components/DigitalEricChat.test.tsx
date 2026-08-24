import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { DigitalEricChat } from './DigitalEricChat';

const originalEnv = import.meta.env.VITE_CHAT_API_URL;

describe('DigitalEricChat', () => {
  afterEach(() => {
    import.meta.env.VITE_CHAT_API_URL = originalEnv;
  });

  it('starts closed with an accessible orb button and a visible AI tag', () => {
    render(<DigitalEricChat />);
    expect(screen.getByRole('button', { name: /chat with digital eric/i })).toBeInTheDocument();
    expect(screen.getByTestId('ai-badge-closed')).toHaveTextContent('AI');
  });

  it('opens a panel with a visible AI disclosure badge', async () => {
    render(<DigitalEricChat />);
    fireEvent.click(screen.getByRole('button', { name: /chat with digital eric/i }));
    expect(await screen.findByTestId('ai-badge')).toHaveTextContent(/ai avatar/i);
  });

  it('shows starter chips that fill and send a message', async () => {
    import.meta.env.VITE_CHAT_API_URL = ''; // offline mode: canned reply
    render(<DigitalEricChat />);
    fireEvent.click(screen.getByRole('button', { name: /chat with digital eric/i }));
    const chip = await screen.findByTestId('starter-chips');
    expect(chip).toBeInTheDocument();

    fireEvent.click(within(chip).getByRole('button', { name: 'What is AGOS?' }));
    expect(await screen.findByText(/What is AGOS\?/)).toBeInTheDocument();
    expect(await screen.findByText(/backend isn't wired up yet/i)).toBeInTheDocument();
  });

  it('streams SSE tokens from the backend into the last assistant bubble', async () => {
    import.meta.env.VITE_CHAT_API_URL = 'https://eric-agent.example';
    const sse =
      'data: {"token":"I built"}\n\n' +
      'data: {"token":" AGOS."}\n\n' +
      'data: {"token":"[DONE]"}\n\n';
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(sse));
        controller.close();
      },
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(stream, { status: 200 })));

    render(<DigitalEricChat />);
    fireEvent.click(screen.getByRole('button', { name: /chat with digital eric/i }));
    const input = screen.getByLabelText(/message digital eric/i);
    fireEvent.change(input, { target: { value: 'tell me about agos' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(screen.getByText('I built AGOS.').closest('div')).toBeTruthy());
    vi.unstubAllGlobals();
  });
});
