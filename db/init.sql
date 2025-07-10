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
\.


--
-- Data for Name: shortlink; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shortlink (id, targeturl, shortpath, clickcount, createdat, expiresat) FROM stdin;
\.


--
-- Name: follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.follow_id_seq', 30, true);


--
-- Name: shortlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shortlink_id_seq', 42, true);


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

