-- 1. ALTER EXISTING case_studies TABLE
-- We safely rename columns to match the React frontend without losing data
ALTER TABLE case_studies RENAME COLUMN summary TO short_description;
ALTER TABLE case_studies RENAME COLUMN cover_image_url TO cover_image;

-- Add new columns with safe defaults
ALTER TABLE case_studies
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS timeline text,
  ADD COLUMN IF NOT EXISTS project_type text,
  ADD COLUMN IF NOT EXISTS tools jsonb,
  ADD COLUMN IF NOT EXISTS hero_image text,
  ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS published boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Note: Ensure no duplicate slugs exist in production before running this constraint addition
ALTER TABLE case_studies ADD CONSTRAINT case_studies_slug_key UNIQUE (slug);

-- 2. CREATE MISSING TABLES
-- Using bigint for case_study_id to match the existing case_studies.id type

CREATE TABLE IF NOT EXISTS case_study_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id bigint REFERENCES case_studies(id) ON DELETE CASCADE,
  section_type text NOT NULL,
  title text,
  content text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_study_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id bigint REFERENCES case_studies(id) ON DELETE CASCADE,
  section_id uuid REFERENCES case_study_sections(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  caption text,
  image_type text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_study_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id bigint REFERENCES case_studies(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_study_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id bigint REFERENCES case_studies(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 3. ENABLE RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_goals ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES
-- Clean up existing case_studies policies if needed, or just add ours:
DROP POLICY IF EXISTS "Public users can view published case studies" ON case_studies;
CREATE POLICY "Public users can view published case studies" 
  ON case_studies FOR SELECT 
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can manage case studies" ON case_studies;
CREATE POLICY "Authenticated users can manage case studies" 
  ON case_studies FOR ALL 
  USING (auth.role() = 'authenticated');

-- POLICIES for case_study_sections
CREATE POLICY "Public users can view sections of published case studies" 
  ON case_study_sections FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM case_studies 
    WHERE case_studies.id = case_study_sections.case_study_id 
    AND case_studies.published = true
  ));

CREATE POLICY "Authenticated users can manage sections" 
  ON case_study_sections FOR ALL 
  USING (auth.role() = 'authenticated');

-- POLICIES for case_study_images
CREATE POLICY "Public users can view images of published case studies" 
  ON case_study_images FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM case_studies 
    WHERE case_studies.id = case_study_images.case_study_id 
    AND case_studies.published = true
  ));

CREATE POLICY "Authenticated users can manage images" 
  ON case_study_images FOR ALL 
  USING (auth.role() = 'authenticated');

-- POLICIES for case_study_insights
CREATE POLICY "Public users can view insights of published case studies" 
  ON case_study_insights FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM case_studies 
    WHERE case_studies.id = case_study_insights.case_study_id 
    AND case_studies.published = true
  ));

CREATE POLICY "Authenticated users can manage insights" 
  ON case_study_insights FOR ALL 
  USING (auth.role() = 'authenticated');

-- POLICIES for case_study_goals
CREATE POLICY "Public users can view goals of published case studies" 
  ON case_study_goals FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM case_studies 
    WHERE case_studies.id = case_study_goals.case_study_id 
    AND case_studies.published = true
  ));

CREATE POLICY "Authenticated users can manage goals" 
  ON case_study_goals FOR ALL 
  USING (auth.role() = 'authenticated');
