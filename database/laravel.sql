-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12-Dez-2024 às 16:45
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `laravel`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_12_11_172844_create_products_table', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'authToken', 'b3384a37872964ba6bcf8502e1e6f18fae8feaa331b3e5eea67cd30a7a32a28b', '[\"*\"]', '2024-12-12 16:42:33', NULL, '2024-12-12 14:12:38', '2024-12-12 16:42:33'),
(2, 'App\\Models\\User', 1, 'authToken', 'acd394aa1a2f63d8f1a313603101e7fd4e238b834ed6aa5608c510e7399d5791', '[\"*\"]', NULL, NULL, '2024-12-12 16:23:23', '2024-12-12 16:23:23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `quantity`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Devonte Keebler', 'Nostrum natus et nam eum modi quisquam numquam. Quasi necessitatibus qui debitis error. Itaque voluptate provident explicabo. Ut cum ducimus quia voluptatem ut quia.', 90.44, 19, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(2, 'Prof. Alexis Pfeffer', 'Odit recusandae aut facilis nisi a autem. Autem distinctio totam vel sequi id. Aliquid tempore nihil eos totam minima excepturi.', 15.44, 27, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(3, 'Elian Schuppe', 'Eos ea aut recusandae alias qui alias. Dignissimos vero beatae reiciendis sunt. Iste qui et cum est.', 55.52, 31, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(4, 'Wanda Koch', 'Adipisci corporis reiciendis et vel. Et quos id ipsum laborum voluptatibus doloremque aut. Molestiae autem debitis voluptates minima. Dolor temporibus ea adipisci harum repudiandae at et.', 15.36, 76, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(5, 'Miguel Herman DVM', 'Quasi beatae beatae et quia ratione nihil quia. Inventore ut voluptatem eos autem ut tempora ipsa. Repudiandae culpa qui perspiciatis. Ex quis nihil ut molestiae ad id maxime. Odio voluptatem voluptatibus numquam non ullam.', 63.32, 65, 1, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(6, 'Broderick Dietrich', 'Et quo harum eius eum illum quia velit dolor. Consequatur quos et et voluptatem sunt.', 7.44, 98, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(7, 'Prof. Krystal Miller', 'Non sint enim qui et animi sed unde. Blanditiis eum facilis et dicta numquam. Ipsum totam est ut facilis. Vel ea ipsam possimus dolorem.', 27.35, 90, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(8, 'Tess Wyman', 'Eum asperiores quod aperiam quam. Sapiente molestiae porro sunt tempora saepe a qui. Eius assumenda inventore non sit. Accusantium perspiciatis est consequatur odit.', 12.07, 49, 1, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(9, 'Dr. Chanelle Kunze', 'Id aut necessitatibus perferendis delectus vel doloribus. Quasi ipsum eius est iure ipsa corporis consequatur vitae. Sed molestiae veniam esse sint quidem ut. Reiciendis eos voluptatibus iure fugiat illo. Et pariatur sit est ipsa recusandae.', 28.30, 79, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(10, 'Dewitt Bernier', 'Debitis qui ratione dolore laboriosam. Maxime maxime optio facilis aliquid praesentium culpa quod.', 97.65, 93, 1, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(11, 'Conrad Connelly', 'Et possimus voluptatem exercitationem maxime sit dolores. Et in architecto accusantium veniam enim quia autem. Et earum ut pariatur consequatur. Odio nisi quo ut sed voluptatum consequuntur.', 39.66, 29, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(12, 'Emmanuelle Nolan', 'Omnis quisquam pariatur earum accusantium quasi libero. Expedita quae occaecati ex omnis tempora numquam consequatur ab. Alias saepe iure porro ut doloremque aspernatur sit. Officiis reprehenderit ipsum temporibus aliquam velit sit. Aut modi sit beatae a.', 30.74, 2, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(13, 'Baron Wiegand', 'Et provident ut sit iusto ullam esse nihil. Sed ducimus explicabo consequatur iusto officiis ab. Non optio earum quo ex rerum. Facilis quis sequi nostrum id quia fugiat aut.', 47.89, 100, 1, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(14, 'Hortense Spinka', 'Qui aut recusandae asperiores temporibus. Qui impedit architecto est ducimus totam non. Nulla qui quae odit cum sequi aut. Illo soluta nemo vero ut ab.', 77.20, 48, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(15, 'Brooklyn Spencer', 'Perferendis temporibus doloremque et qui voluptates natus. Magnam debitis et cupiditate fugiat eos aliquid voluptas et. Eligendi non placeat similique hic beatae. Pariatur totam et reiciendis itaque.', 72.87, 74, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(16, 'Kiana Veum', 'Nobis at expedita vitae est quae. Sapiente laborum vel culpa eius autem. Labore ea doloribus doloribus ea eum vel. Ipsam molestiae et nulla perferendis qui nesciunt omnis.', 2.54, 69, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(17, 'Marisa Medhurst', 'Ea laboriosam nulla nobis eius ab. Ipsam est sunt et odio est. Aut voluptates nulla asperiores quam. Similique porro sunt quisquam pariatur sint.', 39.98, 20, 1, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(18, 'Dr. Zackery Collier', 'Exercitationem ut et dignissimos amet nihil earum suscipit deleniti. Sunt aut qui quod quas quos. Distinctio rem tenetur asperiores voluptatem. Blanditiis alias quod excepturi ut omnis.', 60.40, 55, 1, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(19, 'teste', 'Description', 10.00, 5, 1, '2024-12-12 13:47:40', '2024-12-12 16:39:46'),
(20, 'Prof. Sherwood Waelchi', 'Deleniti omnis vero mollitia amet. Harum molestias ut impedit maxime quidem delectus. Velit reiciendis voluptas expedita vel ex excepturi in eaque. Commodi sed voluptatibus voluptatem.', 27.14, 58, 0, '2024-12-12 13:47:40', '2024-12-12 13:47:40'),
(22, 'Novo Produto', 'Descrição do produto', 20.00, 10, 1, '2024-12-12 14:17:50', '2024-12-12 14:17:50'),
(23, 'Novo Produto', 'Descrição do produto', 20.00, 10, 1, '2024-12-12 14:23:37', '2024-12-12 14:23:37'),
(26, 'Novo Produto', 'Descrição do produto', 20.00, 10, 1, '2024-12-12 16:46:37', '2024-12-12 16:46:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(500) NOT NULL DEFAULT 'admin',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'teste', 'teste@teste.com', NULL, '$2y$10$RmKzMb9/bvaj/oZrrtqnC.rMDt7WuSKIDDvhfIjFlDN3SaMqyroAK', 'admin', NULL, '2024-12-12 13:43:44', '2024-12-12 13:43:44'),
(2, 'Clara Johnston DDS', 'test@example.com', '2024-12-12 14:23:37', 'password', 'admin', 'yomxWaWDU2', '2024-12-12 14:23:37', '2024-12-12 14:23:37'),
(5, 'Guillermo Collins DVM', 'test52643458@example.com', '2024-12-12 14:38:17', 'password', 'admin', '1ZIq4wGLUY', '2024-12-12 14:38:17', '2024-12-12 14:38:17'),
(6, 'teste', 'teste5@teste.com', NULL, '$2y$10$0uJIUfDBTIrGSL14yIlBouMCD.u5EoSITGMq7XgghjvAah6QsxLoK', 'admin', NULL, '2024-12-12 16:10:09', '2024-12-12 16:10:09'),
(7, 'Dr. Marilie Nienow II', 'test81302802@example.com', '2024-12-12 16:46:37', 'password', 'admin', 'CsxoL14CsO', '2024-12-12 16:46:37', '2024-12-12 16:46:37');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Índices para tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Índices para tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
