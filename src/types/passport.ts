type PassportProfile = {
  bio: string | null;
  display_name: string | null;
  location: string | null;
  tags: string[];
  image_url: string | null;
};

type Passport = {
  activity_score: number;
  identity_score: number;
  skills_score: number;
  calculating_score: boolean;
  connections_count: number;
  human_checkmark: boolean;
  last_calculated_at: string | null;
  main_wallet: string | null;
  passport_id: number | null;
  score: number | null;
  passport_profile: PassportProfile;
  verified_wallets: string[];
  verified: boolean;
  created_at: string;
  main_wallet_changed_at: string | null;
  socials_calculated_at: string;
};

type TTalentPassportListResponse = {
  passports: Passport[];
  pagination: {
    current_page: number;
    last_page: number;
    total: number;
  };
};

type TTalentPassportResponse = {
  passport: Passport;
};

/* Credentials API */

type PassportCredentialCategory = "Activity" | "Identity" | "Skills";

type PassportCredentialType =
  | "active_wallet"
  | "base_buildathon"
  | "base_builder"
  | "base_builds"
  | "base_camp"
  | "base_learn"
  | "basename"
  | "bonsai"
  | "build"
  | "celo_builder"
  | "coinbase_verified_id"
  | "crypto_nomads"
  | "cyber_id"
  | "degenens"
  | "eth_global"
  | "farcaster"
  | "fractal_id"
  | "gitcoin"
  | "github"
  | "jam_creator_club"
  | "lens"
  | "linkedin"
  | "optimism_builder"
  | "phaver"
  | "pooly_supporter"
  | "retro_pgf"
  | "safe_wallet"
  | "social_capital_rank"
  | "talent_passport"
  | "take_off"
  | "worldcoin"
  | "taikai"
  | "the_arena"
  | "yellow_collective";

interface PassportCredential {
  earned_at: string | null;
  id: string;
  category: PassportCredentialCategory;
  last_calculated_at: string | null;
  max_score: number;
  name: string;
  score: number;
  type: PassportCredentialType;
  value: string | null;
}

type TCredentialsResponse = {
  passport_credentials: PassportCredential[];
};
