CREATE TABLE IF NOT EXISTS public.meta (
    key character varying(256) primary key,
    value text
);

INSERT INTO public.meta 
        (key, value) 
    VALUES 
        ('last_updated', NOW())
ON CONFLICT(key) DO UPDATE SET
    value = NOW()
;