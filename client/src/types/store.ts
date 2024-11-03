export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BaseState {
  status: LoadingState;
  error: string | null;
}
