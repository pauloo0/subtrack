-- Enable RLS on clients and packages tables
alter table public.clients enable row level security;
alter table public.packages enable row level security;

-- Allow authenticated users full access to clients
create policy "Authenticated users can do everything on clients"
on public.clients
for all
to authenticated
using (true)
with check (true);

-- Allow authenticated users full access to packages
create policy "Authenticated users can do everything on packages"
on public.packages
for all
to authenticated
using (true)
with check (true);
