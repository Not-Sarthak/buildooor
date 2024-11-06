/* Get All Passport by Score API */

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
    laTst_page: number;
    total: number;
  };
};

/* Get ALl Passport by Score API */

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
  /** The timestamp of when the passport credential was earned */
  earned_at: string | null;

  /** The id of the passport credential */
  id: string;

  /** The category of the credential */
  category: PassportCredentialCategory;

  /** The last time the passport credential was calculated */
  last_calculated_at: string | null;

  /** The max score of the passport credential */
  max_score: number;

  /** The name of the passport credential */
  name: string;

  /** The score of the passport credential */
  score: number;

  /** The type of the passport credential */
  type: PassportCredentialType;

  /** The value of the passport credential */
  value: string | null;
}

type TCredentialsResponse = {
  passport_credentials: PassportCredential[];
};
