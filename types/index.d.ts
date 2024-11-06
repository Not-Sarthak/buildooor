type PassportProfile = {
  bio: string;
  display_name: string;
  location: string;
  tags: string[];
  image_url: string;
};

type Passport = {
  activity_score: number;
  identity_score: number;
  skills_score: number;
  calculating_score: boolean;
  human_checkmark: boolean;
  last_calculated_at: string;
  main_wallet: string;
  main_wallet_changed_at: string | null;
  passport_id: number;
  score: number;
  passport_profile: PassportProfile;
  verified: boolean;
  verified_wallets: string[];
  socials_calculated_at: string;
  created_at: string;
};

type TTalentData = {
  passports: Passport[];
  pagination: {
    current_page: number;
    last_page: number;
    total: number;
  };
};
