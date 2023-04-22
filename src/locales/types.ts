export type Metadata = {
  title?: string;
  description?: string;
}

export type Dictionary = {
  home: {
    metadata?: Metadata;
    content: {
      description: string;
    }
  };
  about: {
    metadata?: Metadata;
    content: {
      description: string;
    }
  };
  project: {
    name: string;
  };
  contact: {
    metadata?: Metadata;
    content: {
      description: string;
    }
  };
}