export type Recipe = {
  steps: {
    step: number;
    description: string;
    image?: string;
    optional?: boolean;
  }[];
};
