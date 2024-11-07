export interface WalletWrapperProps {
  className?: string;
}

export interface EnsResponse {
  name: string | null;
  error?: Error;
}

export interface BalanceResponse {
  formatted: string;
  symbol: string;
}
