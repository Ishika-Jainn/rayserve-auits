
// Speech recognition and synthesis utilities

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const startSpeechRecognition = (
  onResult: (text: string) => void,
  onEnd: () => void
): (() => void) => {
  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error('Speech recognition not supported in this browser');
    return () => {};
  }

  // Create recognition instance
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    onEnd();
  };

  recognition.start();

  // Return a cleanup function to stop recognition
  return () => {
    recognition.stop();
  };
};

export const speakText = (text: string, onEnd?: () => void): void => {
  // Check if browser supports speech synthesis
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }

  // Create speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
  }

  // Speak the text
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};
