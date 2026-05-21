CREATE POLICY "Enable read for all" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Enable insert for all" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all" ON public.inquiries FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for all" ON public.inquiries FOR DELETE USING (true);
