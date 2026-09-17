alter table packages
add constraint fk_packages_clients
foreign key (client_id) references clients(id)
on delete cascade
on update cascade;

alter table packages
alter column client_id drop default,
add column username varchar default '',
add column password varchar default '',
add column fullurl varchar default '',
add column price numeric (10, 2) default 40;
