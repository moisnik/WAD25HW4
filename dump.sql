--
-- PostgreSQL database dump
--

\restrict bL0xdxv3imZQiHl34LN6gCCEBS5kaDP9rqEP8JaLrHJ3SkTfXFXH7NoGi9CweeQ

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: posttable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posttable (
    id integer NOT NULL,
    title text,
    body text NOT NULL,
    date timestamp with time zone DEFAULT now()
);


ALTER TABLE public.posttable OWNER TO postgres;

--
-- Name: posttable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posttable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posttable_id_seq OWNER TO postgres;

--
-- Name: posttable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posttable_id_seq OWNED BY public.posttable.id;


--
-- Name: posttable id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posttable ALTER COLUMN id SET DEFAULT nextval('public.posttable_id_seq'::regclass);


--
-- Data for Name: posttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posttable (id, title, body, date) FROM stdin;
3	First post	testing testing	2025-12-13 20:21:21.50531+02
4	Second post	it is workinggg	2025-12-13 20:21:21.50531+02
5	\N	test	2025-12-13 20:21:21.50531+02
6	\N	PLSSSS	2025-12-13 20:29:41.510368+02
7	\N	YAY	2025-12-13 20:30:18.235821+02
\.


--
-- Name: posttable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posttable_id_seq', 7, true);


--
-- Name: posttable posttable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posttable
    ADD CONSTRAINT posttable_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict bL0xdxv3imZQiHl34LN6gCCEBS5kaDP9rqEP8JaLrHJ3SkTfXFXH7NoGi9CweeQ

