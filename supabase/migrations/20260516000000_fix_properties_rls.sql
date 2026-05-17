-- Allow authenticated users to read properties
CREATE POLICY "Allow authenticated read access"
  ON public.properties
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow admins to manage properties (Insert)
CREATE POLICY "Admins can insert properties"
  ON public.properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Allow admins to manage properties (Update)
CREATE POLICY "Admins can update properties"
  ON public.properties
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Allow admins to manage properties (Delete)
CREATE POLICY "Admins can delete properties"
  ON public.properties
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );
