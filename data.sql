DROP DATABASE IF EXISTS messagely;

CREATE DATABASE messagely;

\c messagely

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
    VALUES  ('jaredg', 'pass', 'jared', 'glenn', '+4355123350',
            '2024-01-19 09:10:14.691514', '2024-01-19T09:10:14.691594+00:00'),
            ('bekag', 'pass', 'beka', 'glenn', '+4355123351',
            '2024-01-20 09:10:14.691514', '2024-01-20T09:10:14.691594+00:00');

INSERT INTO messages (id, from_username, to_username, body, sent_at)
    VALUES  ('1', 'bekag', 'jaredg', 'hey there', '2024-01-21T09:10:14.691594+00:00'),
            ('2', 'bekag', 'jaredg', 'whoa there', '2024-01-21T09:15:14.691594+00:00');