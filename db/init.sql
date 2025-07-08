--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.shortlink DROP CONSTRAINT IF EXISTS shortlink_shortpath_key;
ALTER TABLE IF EXISTS ONLY public.shortlink DROP CONSTRAINT IF EXISTS shortlink_pkey;
ALTER TABLE IF EXISTS public.shortlink ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.shortlink_id_seq;
DROP TABLE IF EXISTS public.shortlink;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shortlink; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shortlink (
    id integer NOT NULL,
    targeturl text NOT NULL,
    shortpath character varying(32) NOT NULL,
    clickcount integer DEFAULT 0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.shortlink OWNER TO postgres;

--
-- Name: shortlink_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shortlink_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shortlink_id_seq OWNER TO postgres;

--
-- Name: shortlink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shortlink_id_seq OWNED BY public.shortlink.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: shortlink id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shortlink ALTER COLUMN id SET DEFAULT nextval('public.shortlink_id_seq'::regclass);


--
-- Data for Name: shortlink; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shortlink (id, targeturl, shortpath, clickcount, createdat) FROM stdin;
1	https://www.google.com/	UKN86b	0	2025-07-07 22:45:28.780414
2	https://www.google.com/	JbTSt6	0	2025-07-07 22:54:20.546941
3	https://www.google.com/	jx7JN0	0	2025-07-07 23:02:37.128824
4	https://www.google.com/	zskNVr	0	2025-07-07 23:07:22.306217
5	https://www.youtube.com/	bpQMRA	0	2025-07-07 23:07:35.726246
6	https://www.youtube.com/	qqfaFt	0	2025-07-07 23:08:10.801182
7	https://www.youtube.com/watch?v=nUO4xCujPzk&ab_channel=AlexeyArestovych	mznLqf	0	2025-07-07 23:08:19.390938
8	https://chatgpt.com/c/686d17ba-5164-8002-897a-1e701ffb97c2	tZGh06	0	2025-07-08 16:10:23.046109
9	http://localhost:3000/short/tZGh06	j3ZGRP	0	2025-07-08 16:13:26.391396
10	https://www.youtube.com/watch?v=j1KTfIta-oI&ab_channel=%D0%97%D1%83%D0%B1%D0%B3%D0%BB%D1%8F%D0%BD%D1%83%D0%BB%D0%B8%D0%BE%D0%B4%D0%BE%D0%B1%D1%80%D0%B8%D0%BB%29	U4Ubq5	0	2025-07-08 16:17:07.584564
11	https://www.youtube.com/watch?v=Exlc6NmGTqA&ab_channel=%D0%97%D1%83%D0%B1%D0%B0%D1%80%D0%B5%D0%B2.mp4	wBdaot	0	2025-07-08 17:09:17.227181
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id) FROM stdin;
1
2
3
4
\.


--
-- Name: shortlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shortlink_id_seq', 11, true);


--
-- Name: shortlink shortlink_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shortlink
    ADD CONSTRAINT shortlink_pkey PRIMARY KEY (id);


--
-- Name: shortlink shortlink_shortpath_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shortlink
    ADD CONSTRAINT shortlink_shortpath_key UNIQUE (shortpath);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

