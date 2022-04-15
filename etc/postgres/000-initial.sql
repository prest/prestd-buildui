CREATE TABLE IF NOT EXISTS example_table (
    id serial,
    field_char_50_unique VARCHAR ( 50 ) UNIQUE NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    field_text TEXT,
    field_type_jsonb jsonb,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

INSERT INTO example_table
  (field_char_50_unique, email, field_text, field_type_jsonb)
VALUES
  ('unique 50 - 01', 'opensource@prestd.com', 'text field', '{"field1": "value field 1", "field2": "value field 2", "int_field": 10}'),
  ('unique 50 - 02', 'open-source@prestd.com', 'text field', '{"field1": "value field 1", "field2": "value field 2", "int_field": 11}'),
  ('unique 50 - 03', 'buildui@prestd.com', 'text field', '{"field1": "value field 1", "field2": "value field 2", "int_field": 12}');
