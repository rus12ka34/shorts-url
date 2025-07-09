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

ALTER TABLE IF EXISTS ONLY public.follow DROP CONSTRAINT IF EXISTS follow_shortlinkid_fkey;
ALTER TABLE IF EXISTS ONLY public.shortlink DROP CONSTRAINT IF EXISTS unique_shortpath;
ALTER TABLE IF EXISTS ONLY public.shortlink DROP CONSTRAINT IF EXISTS shortlink_shortpath_key;
ALTER TABLE IF EXISTS ONLY public.shortlink DROP CONSTRAINT IF EXISTS shortlink_pkey;
ALTER TABLE IF EXISTS ONLY public.follow DROP CONSTRAINT IF EXISTS follow_pkey;
ALTER TABLE IF EXISTS public.shortlink ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.follow ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.shortlink_id_seq;
DROP TABLE IF EXISTS public.shortlink;
DROP SEQUENCE IF EXISTS public.follow_id_seq;
DROP TABLE IF EXISTS public.follow;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follow (
    id integer NOT NULL,
    shortlinkid integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip text NOT NULL
);


ALTER TABLE public.follow OWNER TO postgres;

--
-- Name: follow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.follow_id_seq OWNER TO postgres;

--
-- Name: follow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.follow_id_seq OWNED BY public.follow.id;


--
-- Name: shortlink; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shortlink (
    id integer NOT NULL,
    targeturl text NOT NULL,
    shortpath character varying(32) NOT NULL,
    clickcount integer DEFAULT 0,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    expiresat timestamp with time zone
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
-- Name: follow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow ALTER COLUMN id SET DEFAULT nextval('public.follow_id_seq'::regclass);


--
-- Name: shortlink id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shortlink ALTER COLUMN id SET DEFAULT nextval('public.shortlink_id_seq'::regclass);


--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follow (id, shortlinkid, createdat, ip) FROM stdin;
1	21	2025-07-09 22:53:54.470253	::1
2	21	2025-07-09 22:59:16.531126	::1
3	22	2025-07-09 23:17:12.582641	::1
4	22	2025-07-09 23:17:16.431574	::1
5	22	2025-07-09 23:17:18.728153	::1
6	22	2025-07-09 23:17:20.742445	::1
\.


--
-- Data for Name: shortlink; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shortlink (id, targeturl, shortpath, clickcount, createdat, expiresat) FROM stdin;
1	https://www.google.com/	UKN86b	0	2025-07-07 22:45:28.780414	\N
2	https://www.google.com/	JbTSt6	0	2025-07-07 22:54:20.546941	\N
3	https://www.google.com/	jx7JN0	0	2025-07-07 23:02:37.128824	\N
4	https://www.google.com/	zskNVr	0	2025-07-07 23:07:22.306217	\N
5	https://www.youtube.com/	bpQMRA	0	2025-07-07 23:07:35.726246	\N
6	https://www.youtube.com/	qqfaFt	0	2025-07-07 23:08:10.801182	\N
7	https://www.youtube.com/watch?v=nUO4xCujPzk&ab_channel=AlexeyArestovych	mznLqf	0	2025-07-07 23:08:19.390938	\N
8	https://chatgpt.com/c/686d17ba-5164-8002-897a-1e701ffb97c2	tZGh06	0	2025-07-08 16:10:23.046109	\N
9	http://localhost:3000/short/tZGh06	j3ZGRP	0	2025-07-08 16:13:26.391396	\N
10	https://www.youtube.com/watch?v=j1KTfIta-oI&ab_channel=%D0%97%D1%83%D0%B1%D0%B3%D0%BB%D1%8F%D0%BD%D1%83%D0%BB%D0%B8%D0%BE%D0%B4%D0%BE%D0%B1%D1%80%D0%B8%D0%BB%29	U4Ubq5	0	2025-07-08 16:17:07.584564	\N
11	https://www.youtube.com/watch?v=Exlc6NmGTqA&ab_channel=%D0%97%D1%83%D0%B1%D0%B0%D1%80%D0%B5%D0%B2.mp4	wBdaot	0	2025-07-08 17:09:17.227181	\N
12	https://pomodoro-tracker.com/	v0bZAX	0	2025-07-09 18:17:57.902027	2025-07-12 00:00:00+03
13	https://www.youtube.com/watch?v=nUO4xCujPzk&ab_channel=AlexeyArestovych	mqg2nw	0	2025-07-09 18:25:39.656269	2025-07-08 00:00:00+03
14	https://www.youtube.com/watch?v=nUO4xCujPzk&ab_channel=AlexeyArestovych	MoaDBg	0	2025-07-09 18:25:50.091849	2025-07-10 00:00:00+03
15	https://translate.google.com/?sl=en&tl=ru&text=expiresAt&op=translate	transtater	0	2025-07-09 18:32:30.955681	2025-07-10 00:00:00+03
16	https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date	2qEthr	0	2025-07-09 18:34:45.401917	2025-07-10 00:00:00+03
19	https://www.google.com/search?q=%D1%87%D1%82%D0%BE+%D1%82%D0%B0%D0%BA%D0%BE+alias+%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8&oq=%D1%87%D1%82%D0%BE+%D1%82%D0%B0%D0%BA%D0%BE+alias+%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAHSAQg1NzM0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8	ScGruI	0	2025-07-09 18:42:16.490646	2025-07-12 00:00:00+03
21	https://chatgpt.com/c/686ebf08-a2f0-8002-a105-dc673b62f28b	ywFjCb	0	2025-07-09 22:53:51.367411	2025-07-12 00:00:00+03
22	https://pomodoro-tracker.com/	x9okXX	0	2025-07-09 23:17:06.858041	2025-07-12 00:00:00+03
\.


--
-- Name: follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.follow_id_seq', 6, true);


--
-- Name: shortlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shortlink_id_seq', 22, true);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (id);


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
-- Name: shortlink unique_shortpath; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shortlink
    ADD CONSTRAINT unique_shortpath UNIQUE (shortpath);


--
-- Name: follow follow_shortlinkid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_shortlinkid_fkey FOREIGN KEY (shortlinkid) REFERENCES public.shortlink(id);


--
-- PostgreSQL database dump complete
--

