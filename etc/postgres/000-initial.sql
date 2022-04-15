CREATE TABLE IF NOT EXISTS example_table (
    id serial,
    field_char_50_unique VARCHAR ( 50 ) UNIQUE NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    field_text TEXT,
    field_type_jsonb jsonb,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
