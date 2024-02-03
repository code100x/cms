--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Data for Name: Content; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public."Content" VALUES (1, 'folder', 'week 1', NULL, 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1.jpg', NULL, '2024-02-01 02:26:03.299', NULL);
INSERT INTO public."Content" VALUES (2, 'notion', 'Notes for week 1', NULL, 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/notes.png', 1, '2024-02-01 02:27:17.847', NULL);
INSERT INTO public."Content" VALUES (3, 'video', 'test video for week 1', NULL, 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/week-1-orientation.jpg', 1, '2024-02-01 02:28:09.21', NULL);


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public."Course" VALUES (1, 'test course 1', 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test1.png', 'test course 1', 'test-course-1', 1, '2', false);
INSERT INTO public."Course" VALUES (2, 'test course 2', 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/images/test2.png', 'test course 1', 'test-course-2', 2, '3', false);


--
-- Data for Name: CourseContent; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public."CourseContent" VALUES (1, 1);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public."User" VALUES ('1', 'asdas', 'Random', false);


--
-- Data for Name: DiscordConnect; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--



--
-- Data for Name: DiscordConnectBulk; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--



--
-- Data for Name: NotionMetadata; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public."NotionMetadata" VALUES (1, '39298af78c0f4c4ea780fd448551bad3', 2);


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--



--
-- Data for Name: UserPurchases; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--



--
-- Data for Name: VideoMetadata; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public."VideoMetadata" VALUES (1, 3, 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', '', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://appx-recordings.s3.ap-south-1.amazonaws.com/drm/100x/slides/Loops%2C+callbacks.pdf', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://www.w3schools.com/html/mov_bbb.mp4', '[]', NULL, NULL);


--
-- Data for Name: VideoProgress; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--



--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: harkirat.iitr
--

INSERT INTO public._prisma_migrations VALUES ('2cb37668-698a-4cc3-8d90-6c20cf722fc7', 'b1d170612be13d41aea80a4ec1ab68ab071239875dc94e0fd6797000056ccf41', '2024-02-01 02:09:10.5315+00', '20231130102613_add_schema_subtitles', NULL, NULL, '2024-02-01 02:09:10.035975+00', 1);
INSERT INTO public._prisma_migrations VALUES ('6e88951f-9d61-4104-b575-017b271a05e5', 'fa17c55defa59bb2d80e205cdeacff5cb3b8dc561e9affaaed8c47c81d53557d', '2024-02-01 02:09:01.336845+00', '20231119045842_init', NULL, NULL, '2024-02-01 02:09:00.817496+00', 1);
INSERT INTO public._prisma_migrations VALUES ('f2aefa45-7471-44f2-b9ec-9f2ed9b39850', 'b9b0c89e32ec1b264b67dbd5b4d61705b3138785321876fe8b1aea3f1731d896', '2024-02-01 02:09:02.036485+00', '20231119051035_update_course', NULL, NULL, '2024-02-01 02:09:01.537313+00', 1);
INSERT INTO public._prisma_migrations VALUES ('abcccbca-427a-48fa-89a5-300662201ccc', '24411fdd040a867b704530be3173a034ba46ace0c3ed5321f48d870e46dd1e30', '2024-02-01 02:09:02.747089+00', '20231119063735_added_content', NULL, NULL, '2024-02-01 02:09:02.248628+00', 1);
INSERT INTO public._prisma_migrations VALUES ('bd3fc864-778a-4354-9d21-9f0f609bf1cc', '313f097447e105cca3b8c06d6389074c14d2eb60b5a95df33d7329f91c67bd26', '2024-02-01 02:09:11.238436+00', '20231204062722_open_to_everyone', NULL, NULL, '2024-02-01 02:09:10.730563+00', 1);
INSERT INTO public._prisma_migrations VALUES ('060ec8df-a90e-4916-a9a1-29de9ccb8fdd', '2523af4300f509d6274d2896682bb8e2744847e8443353387404d35c4eaf585f', '2024-02-01 02:09:03.461874+00', '20231119070313_update_video_metadata', NULL, NULL, '2024-02-01 02:09:02.9496+00', 1);
INSERT INTO public._prisma_migrations VALUES ('54cdf8c8-be6d-469c-befd-c00e3da296a5', '40024c6a4e5b4b5e25a66ba62fcd9c33e4ee0cc4b4205edaae98c925d1721352', '2024-02-01 02:09:04.181422+00', '20231120052608_add_next_auth', NULL, NULL, '2024-02-01 02:09:03.663142+00', 1);
INSERT INTO public._prisma_migrations VALUES ('8d8a9d6f-a608-4435-812d-dc26f0c2740e', '294924b27e98f69673221222165a70fe25c83f927b2c81e546a1dbbf0de17b11', '2024-02-01 02:09:16.838821+00', '20231218162941_makes_content_user_pair_unique', NULL, NULL, '2024-02-01 02:09:16.339838+00', 1);
INSERT INTO public._prisma_migrations VALUES ('2f83b24c-08ad-435e-bfe2-89799a572479', 'ffd6a361ed47a5cf8a1392edace60b9a43c8dd16a0fee3685ce3290f4a860ac5', '2024-02-01 02:09:04.886376+00', '20231120081441_init', NULL, NULL, '2024-02-01 02:09:04.38248+00', 1);
INSERT INTO public._prisma_migrations VALUES ('a76d8b5b-1958-40a6-8771-8526299754aa', '5cead617bdac3a717a03f014a69eb622de4898a4cbe2c33469eac3f366199e8f', '2024-02-01 02:09:11.938076+00', '20231207104413_add_slides_link', NULL, NULL, '2024-02-01 02:09:11.43894+00', 1);
INSERT INTO public._prisma_migrations VALUES ('f7eed66f-eb9a-4ccd-9573-89f7b7fdf9cd', 'cfb946f0f2658440d4c025652272c3a35148734f0f4dfbe1063b339ecbcf4634', '2024-02-01 02:09:05.588334+00', '20231121054501_init', NULL, NULL, '2024-02-01 02:09:05.088276+00', 1);
INSERT INTO public._prisma_migrations VALUES ('d51d3f64-db99-484b-a715-4ba4dde9c6c3', '59219341fd87af6c884491dd4d12902fed1bd782f88720f5fc34ee88805660be', '2024-02-01 02:09:06.317318+00', '20231125233546_appx', NULL, NULL, '2024-02-01 02:09:05.790463+00', 1);
INSERT INTO public._prisma_migrations VALUES ('e18aab23-2e31-46dc-8f4b-50cde08bf4a8', '519f74275de34ca97afc3ca8715888a1ce513c97ed914c98390b35b6ac11795f', '2024-02-01 02:09:07.036122+00', '20231125233929_appx', NULL, NULL, '2024-02-01 02:09:06.530313+00', 1);
INSERT INTO public._prisma_migrations VALUES ('b7aa4b7f-fbd6-4643-8442-88df2ee052d2', 'b577deef6db61fdf0a7ec45a7784368bb4c26877cf73d3a5227d86ac80f75da2', '2024-02-01 02:09:12.643844+00', '20231208122916_add_backdoor_drm', NULL, NULL, '2024-02-01 02:09:12.137991+00', 1);
INSERT INTO public._prisma_migrations VALUES ('936adf40-8672-4635-8bda-683ff35e00c1', 'b74ca1b02fc191f3dff0a583bfc6c0b595390710787b8af7b53126d00b487c37', '2024-02-01 02:09:07.751152+00', '20231126005118_appx', NULL, NULL, '2024-02-01 02:09:07.238724+00', 1);
INSERT INTO public._prisma_migrations VALUES ('a0a45b32-feae-47cb-839d-db51784c00e0', '3abf355b7511f639efbab6c5732204ef6aa1d1d416a2c982d1cc36ea55529f3e', '2024-02-01 02:09:08.438622+00', '20231129013219_add_bulk_discords', NULL, NULL, '2024-02-01 02:09:07.948513+00', 1);
INSERT INTO public._prisma_migrations VALUES ('ee8ef18e-454e-4cee-b381-3407156cd44d', '7d7fd99cbe0adae16d1d86492ded4edddbb60e5fcbb2bbac56ae202629543bf4', '2024-02-01 02:09:09.145517+00', '20231129030824_add_bulk_discords_unique', NULL, NULL, '2024-02-01 02:09:08.645785+00', 1);
INSERT INTO public._prisma_migrations VALUES ('133c30c7-708f-4106-b421-8b2c46477588', '4f7825f35cda8035dc062296d9415fddfb4536d26418b693dfd2c6df5b44dce4', '2024-02-01 02:09:13.358238+00', '20231208123319_add_backdoor_mp4_links', NULL, NULL, '2024-02-01 02:09:12.839857+00', 1);
INSERT INTO public._prisma_migrations VALUES ('8c19e4d3-c4f3-4d50-a23d-7d1dddf96a50', '7122889c09f86ede4a11278658be411ce69c9ee16684e3c7cde39f5806be3442', '2024-02-01 02:09:09.836319+00', '20231129095057_add_schema_subtitles', NULL, NULL, '2024-02-01 02:09:09.342389+00', 1);
INSERT INTO public._prisma_migrations VALUES ('64e9b979-2b12-4f2e-9354-0ed02aa617cf', 'c645fba2e85046acad021ff924989efe93024f3736e133e68c576fd0e014b1c0', '2024-02-01 02:09:17.538851+00', '20240114214841_add_notion_metadata', NULL, NULL, '2024-02-01 02:09:17.040999+00', 1);
INSERT INTO public._prisma_migrations VALUES ('00fd844a-0b72-4802-8556-ebddd99d3b3d', 'd106d2ca2edc2d2af4d85cb0262cdbc92c49ffc7f436bc714083ae2c9a5d70ca', '2024-02-01 02:09:14.038165+00', '20231212075742_add_segemnts_to_videos', NULL, NULL, '2024-02-01 02:09:13.552213+00', 1);
INSERT INTO public._prisma_migrations VALUES ('aed66bb9-8746-4438-a8bf-b5e884d5e01f', 'bf7837373338c8ad4c287816ffee547ef6f04a62bc13c62f19250ad51b415e8e', '2024-02-01 02:09:14.764286+00', '20231214062542_add_more_info', NULL, NULL, '2024-02-01 02:09:14.241811+00', 1);
INSERT INTO public._prisma_migrations VALUES ('19856097-320c-46fd-ae69-988d8235713c', '40d9e779688d2e059d322cc31fd9b8b0a880ca04df5b2c3a55b5662c54cf33be', '2024-02-01 02:09:18.252847+00', '20240114220154_add_notion_metadata_fix', NULL, NULL, '2024-02-01 02:09:17.762369+00', 1);
INSERT INTO public._prisma_migrations VALUES ('4f0db8f8-4334-4aea-a6c2-423ba393582c', '34e6000957e31225337a88786f3c5d2e560196e59257fcb6bc9f99f1de327dc6', '2024-02-01 02:09:15.459504+00', '20231214114048_add_duration', NULL, NULL, '2024-02-01 02:09:14.960956+00', 1);
INSERT INTO public._prisma_migrations VALUES ('f38a927d-059b-41bf-b5ef-3deebf4ace26', '18e70077aaa92e93597b61be0f8768fc6609373ec2f219f2d8fa5fdfa396adf3', '2024-02-01 02:09:16.146544+00', '20231218161052_adds_current_timestamp', NULL, NULL, '2024-02-01 02:09:15.657472+00', 1);


--
-- Name: Content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harkirat.iitr
--

SELECT pg_catalog.setval('public."Content_id_seq"', 3, true);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harkirat.iitr
--

SELECT pg_catalog.setval('public."Course_id_seq"', 1, false);


--
-- Name: NotionMetadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harkirat.iitr
--

SELECT pg_catalog.setval('public."NotionMetadata_id_seq"', 1, true);


--
-- Name: VideoMetadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harkirat.iitr
--

SELECT pg_catalog.setval('public."VideoMetadata_id_seq"', 1, true);


--
-- Name: VideoProgress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: harkirat.iitr
--

SELECT pg_catalog.setval('public."VideoProgress_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--
