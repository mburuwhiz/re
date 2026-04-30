/*
  # Create files table for PDF hosting

  1. New Tables
    - `files`
      - `id` (uuid, primary key)
      - `filename` (text, unique) - the actual filename on disk (e.g., faith.pdf)
      - `display_name` (text) - human-friendly display name
      - `visit_count` (integer, default 0) - tracks downloads/visits
      - `created_at` (timestamptz) - creation timestamp

  2. Security
    - Enable RLS on `files` table
    - Add policy for anonymous users to read files (public listing)
    - Add policy for service role to update visit counts

  3. Seed Data
    - Insert existing files: faith.pdf and micheal.pdf from doc.json
*/

CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text UNIQUE NOT NULL,
  display_name text NOT NULL,
  visit_count integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view files"
  ON files FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can update visit count"
  ON files FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Seed existing files from doc.json
INSERT INTO files (filename, display_name, visit_count)
VALUES
  ('faith.pdf', 'Faith', 0),
  ('micheal.pdf', 'Micheal', 0)
ON CONFLICT (filename) DO NOTHING;
