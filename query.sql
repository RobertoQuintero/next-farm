USE [hibye_granjas_local]
GO
/****** Object:  Schema [CAT]    Script Date: 19/03/2024 10:02:50 p. m. ******/
CREATE SCHEMA [CAT]
GO
/****** Object:  Schema [MOD]    Script Date: 19/03/2024 10:02:50 p. m. ******/
CREATE SCHEMA [MOD]
GO
/****** Object:  Schema [RH]    Script Date: 19/03/2024 10:02:50 p. m. ******/
CREATE SCHEMA [RH]
GO
/****** Object:  Schema [SAT]    Script Date: 19/03/2024 10:02:50 p. m. ******/
CREATE SCHEMA [SAT]
GO
/****** Object:  Table [CAT].[Access_routes]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Access_routes](
	[id_access] [smallint] NOT NULL,
	[description] [varchar](200) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_Access_routes] PRIMARY KEY CLUSTERED 
(
	[id_access] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Birth_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Birth_types](
	[id_birth_type] [tinyint] NULL,
	[description] [varchar](50) NULL,
	[status] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Fertilization_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Fertilization_types](
	[id_fertilization_type] [tinyint] NOT NULL,
	[description] [varchar](50) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_Fertilization_types] PRIMARY KEY CLUSTERED 
(
	[id_fertilization_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Loss_reasons]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Loss_reasons](
	[id_loss_reason] [int] NULL,
	[description] [varchar](200) NULL,
	[status] [bit] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[id_farm] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Pig_stages]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Pig_stages](
	[id_pig_stage] [int] NOT NULL,
	[id_pig_type] [tinyint] NULL,
	[description] [varchar](100) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_Pig_stages] PRIMARY KEY CLUSTERED 
(
	[id_pig_stage] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Pig_tasks]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Pig_tasks](
	[id_pig_task] [int] NOT NULL,
	[id_pig_stage] [int] NULL,
	[description] [varchar](100) NULL,
	[status] [bit] NULL,
	[created_at] [datetime] NULL,
	[id_farm] [int] NULL,
	[days] [tinyint] NULL,
	[while_days] [tinyint] NULL,
	[id_stage_task_type] [tinyint] NULL,
 CONSTRAINT [PK_Pig_tasks] PRIMARY KEY CLUSTERED 
(
	[id_pig_task] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[pig_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[pig_types](
	[id_pig_type] [tinyint] NOT NULL,
	[description] [varchar](255) NULL,
	[status] [bit] NULL,
	[id_user] [int] NULL,
 CONSTRAINT [PK__pig_type__4697EFE41B3488E7] PRIMARY KEY CLUSTERED 
(
	[id_pig_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Races]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Races](
	[id_race] [int] NULL,
	[description] [varchar](200) NULL,
	[status] [bit] NULL,
	[id_farm] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Stage_task_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Stage_task_types](
	[id_stage_task_type] [tinyint] NOT NULL,
	[description] [varchar](100) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_Stage_task_types] PRIMARY KEY CLUSTERED 
(
	[id_stage_task_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Stage_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Stage_types](
	[id_stage_type] [int] NOT NULL,
	[id_pig_type] [int] NULL,
	[description] [varchar](255) NULL,
	[order] [smallint] NULL,
	[status] [bit] NULL,
	[min_weight] [tinyint] NULL,
	[max_weight] [tinyint] NULL,
	[food_amount] [decimal](6, 3) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_stage_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[task_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[task_types](
	[id_task_type] [int] NOT NULL,
	[description] [varchar](255) NULL,
	[status] [bit] NULL,
	[id_farm] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_task_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Tasks]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Tasks](
	[id_task] [int] NOT NULL,
	[id_task_type] [int] NULL,
	[id_stage_type] [int] NULL,
	[description] [varchar](200) NULL,
	[status] [bit] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[days] [tinyint] NULL,
	[id_pig_type] [tinyint] NULL,
	[id_farm] [int] NULL,
 CONSTRAINT [PK__Tasks__C1D2C61726FBA58C] PRIMARY KEY CLUSTERED 
(
	[id_task] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Ubications]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Ubications](
	[id_ubication] [int] NOT NULL,
	[id_pig_type] [int] NULL,
	[description] [varchar](255) NULL,
	[status] [bit] NULL,
	[id_farm] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
 CONSTRAINT [PK__Ubicatio__0563DDCA0B5DA93E] PRIMARY KEY CLUSTERED 
(
	[id_ubication] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [CAT].[Weight_types]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [CAT].[Weight_types](
	[id_weight_type] [tinyint] NOT NULL,
	[description] [varchar](100) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_Weight_types] PRIMARY KEY CLUSTERED 
(
	[id_weight_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Births]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Births](
	[id_birth] [int] NOT NULL,
	[id_pig] [int] NULL,
	[id_stallion] [int] NULL,
	[birth_date] [datetime] NULL,
	[confirm_date] [datetime] NULL,
	[crossing_date] [datetime] NULL,
	[is_positive] [bit] NULL,
	[alive] [tinyint] NULL,
	[dead] [tinyint] NULL,
	[description] [varchar](200) NULL,
	[status] [bit] NULL,
	[created_at] [datetime] NULL,
	[id_user] [int] NULL,
	[id_user_confirm] [int] NULL,
	[id_user_birth] [int] NULL,
	[id_fertilization_type] [tinyint] NULL,
	[id_birth_type] [tinyint] NULL,
	[comment] [varchar](100) NULL,
	[closed] [bit] NULL,
 CONSTRAINT [PK_Births] PRIMARY KEY CLUSTERED 
(
	[id_birth] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Growing_pigs]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Growing_pigs](
	[id_growing_lot] [int] NOT NULL,
	[id_pig_stage] [int] NULL,
	[id_ubication] [int] NULL,
	[quantity] [tinyint] NULL,
	[created_at] [datetime] NULL,
	[exit_date] [datetime] NULL,
	[id_user] [int] NULL,
	[closed] [bit] NULL,
	[status] [bit] NULL,
	[average_weight] [decimal](9, 2) NULL,
	[id_farm] [int] NULL,
	[start_date] [datetime] NULL,
 CONSTRAINT [PK_Growing_pigs] PRIMARY KEY CLUSTERED 
(
	[id_growing_lot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Lot_Piglets]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Lot_Piglets](
	[id_lot_piglets] [int] NOT NULL,
	[id_birth] [int] NULL,
	[quantity] [int] NULL,
	[created_at] [datetime] NULL,
	[id_user] [int] NULL,
	[id_ubication] [int] NULL,
	[id_pig_stage] [int] NULL,
	[code] [varchar](50) NULL,
	[status] [bit] NULL,
	[closed] [bit] NULL,
	[id_farm] [int] NULL,
	[close_date] [datetime] NULL,
 CONSTRAINT [PK__Lot_Pigl__FCE5AC924BC5F3A3] PRIMARY KEY CLUSTERED 
(
	[id_lot_piglets] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Pigs]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Pigs](
	[id_pig] [int] NOT NULL,
	[id_pig_type] [int] NULL,
	[id_ubication] [int] NULL,
	[id_race] [int] NULL,
	[code] [varchar](50) NULL,
	[added_date] [datetime] NULL,
	[visible] [bit] NULL,
	[id_farm] [int] NULL,
	[id_pig_stage] [int] NULL,
	[status] [bit] NULL,
	[created_at] [datetime] NULL,
	[id_stallion] [int] NULL,
	[id_weight_type] [tinyint] NULL,
	[bar_code] [varchar](20) NULL,
 CONSTRAINT [PK__Pigs__6FC862BF7271F70F] PRIMARY KEY CLUSTERED 
(
	[id_pig] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Role_access_routes]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Role_access_routes](
	[id_role_access] [int] NULL,
	[id_role] [tinyint] NULL,
	[id_access] [smallint] NULL,
	[status] [bit] NULL,
	[id_farm] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Stages]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Stages](
	[id_stage] [int] NOT NULL,
	[id_stage_type] [int] NOT NULL,
	[id_pig_type] [int] NULL,
	[description] [varchar](255) NULL,
	[order] [smallint] NULL,
	[status] [bit] NULL,
	[min_weight] [tinyint] NULL,
	[max_weight] [tinyint] NULL,
	[food_amount] [decimal](6, 3) NULL,
	[id_farm] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_stage] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Stallions]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Stallions](
	[id_stallion] [int] NOT NULL,
	[name] [varchar](50) NULL,
	[status] [bit] NULL,
	[id_ubication] [int] NULL,
	[id_race] [int] NULL,
	[created_at] [datetime] NULL,
	[id_farm] [int] NULL,
 CONSTRAINT [PK_Stallions] PRIMARY KEY CLUSTERED 
(
	[id_stallion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MOD].[Tasks]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MOD].[Tasks](
	[id_task] [int] NOT NULL,
	[id_pig] [int] NULL,
	[id_pig_task] [int] NULL,
	[id_user] [int] NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[created_at] [datetime] NULL,
	[done] [bit] NULL,
	[comment] [varchar](200) NULL,
	[status] [bit] NULL,
	[id_lot_piglets] [int] NULL,
 CONSTRAINT [PK__pig_task__1000D39E53E85535] PRIMARY KEY CLUSTERED 
(
	[id_task] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [RH].[Farms]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [RH].[Farms](
	[id_farm] [int] NOT NULL,
	[name] [varchar](100) NULL,
	[address] [varchar](200) NULL,
	[id_user] [int] NULL,
	[zip] [varchar](10) NULL,
	[phone] [varchar](50) NULL,
	[status] [bit] NULL,
	[created_at] [datetime] NULL,
 CONSTRAINT [PK_Farms] PRIMARY KEY CLUSTERED 
(
	[id_farm] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [RH].[Job_positions]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [RH].[Job_positions](
	[id_job_position] [tinyint] NULL,
	[description] [varchar](100) NULL,
	[status] [bit] NULL,
	[id_company] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [RH].[Roles]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [RH].[Roles](
	[id_role] [tinyint] NOT NULL,
	[description] [varchar](50) NULL,
	[status] [bit] NULL,
	[id_user] [int] NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[id_role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [RH].[Users]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [RH].[Users](
	[id_user] [int] NOT NULL,
	[name] [varchar](100) NULL,
	[email] [varchar](50) NULL,
	[phone] [varchar](20) NULL,
	[img_url] [varchar](200) NULL,
	[password] [varchar](200) NULL,
	[id_role] [tinyint] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[status] [bit] NULL,
	[is_active] [bit] NULL,
	[zip] [varchar](10) NULL,
	[address] [varchar](150) NULL,
	[id_state] [tinyint] NULL,
	[id_farm] [int] NULL,
	[is_company] [bit] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [SAT].[Cat_states]    Script Date: 19/03/2024 10:02:50 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [SAT].[Cat_states](
	[id_state] [tinyint] IDENTITY(1,1) NOT NULL,
	[string_key] [varchar](10) NULL,
	[description] [varchar](100) NULL,
	[state_key] [varchar](10) NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_Cat_states] PRIMARY KEY CLUSTERED 
(
	[id_state] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (1, N'Ver usuarios', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (2, N'Crear y modificar usuarios', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (3, N'Borrar usuarios', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (4, N'Ver bitácora de cerdos', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (5, N'Crear y modificar cerdos', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (6, N'Borrar cerdos', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (7, N'Ver accessos', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (8, N'Crear y modificar accesos', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (9, N'Ver ubicaciones', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (10, N'Crear y modificar ubicaciones', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (11, N'Ver tareas', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (12, N'Crear y modificar tareas', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (13, N'Crear y modificar etapas', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (14, N'Crear y modificar motivos de baja', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (15, N'Crear y modificar sementales', 1)
GO
INSERT [CAT].[Access_routes] ([id_access], [description], [status]) VALUES (16, N'Crear y modificar razas', 1)
GO
INSERT [CAT].[Birth_types] ([id_birth_type], [description], [status]) VALUES (1, N'Normal', 1)
GO
INSERT [CAT].[Birth_types] ([id_birth_type], [description], [status]) VALUES (2, N'Carga falsa', 1)
GO
INSERT [CAT].[Birth_types] ([id_birth_type], [description], [status]) VALUES (3, N'Aborto', 1)
GO
INSERT [CAT].[Fertilization_types] ([id_fertilization_type], [description], [status]) VALUES (1, N'Monta', 1)
GO
INSERT [CAT].[Fertilization_types] ([id_fertilization_type], [description], [status]) VALUES (2, N'Inseminación', 1)
GO
INSERT [CAT].[Loss_reasons] ([id_loss_reason], [description], [status], [created_at], [updated_at], [id_farm]) VALUES (1, N'Muerte por enfermedad', 1, CAST(N'2024-02-02T06:00:00.000' AS DateTime), CAST(N'2024-02-03T00:57:10.867' AS DateTime), 1)
GO
INSERT [CAT].[Loss_reasons] ([id_loss_reason], [description], [status], [created_at], [updated_at], [id_farm]) VALUES (2, N'Vendido', 1, CAST(N'2024-02-02T06:00:00.000' AS DateTime), CAST(N'2024-02-02T06:00:00.000' AS DateTime), 1)
GO
INSERT [CAT].[Loss_reasons] ([id_loss_reason], [description], [status], [created_at], [updated_at], [id_farm]) VALUES (3, N'Muerte por accidente', 1, CAST(N'2024-02-02T06:00:00.000' AS DateTime), CAST(N'2024-02-03T00:34:16.677' AS DateTime), 1)
GO
INSERT [CAT].[Loss_reasons] ([id_loss_reason], [description], [status], [created_at], [updated_at], [id_farm]) VALUES (4, N'escapó', 0, CAST(N'2024-02-03T00:34:30.453' AS DateTime), CAST(N'2024-02-03T00:34:30.453' AS DateTime), 1)
GO
INSERT [CAT].[Loss_reasons] ([id_loss_reason], [description], [status], [created_at], [updated_at], [id_farm]) VALUES (5, N'jaula nueva', 0, CAST(N'2024-02-03T00:57:31.770' AS DateTime), CAST(N'2024-02-03T00:57:31.770' AS DateTime), 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (1, 3, N'Inactiva', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (2, 3, N'Vacía', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (3, 3, N'Montada', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (4, 3, N'Cargada sin confirmar', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (5, 3, N'Cargada', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (6, 3, N'Destetando', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (7, 1, N'Calostro', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (8, 1, N'Etapa 2', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (9, 2, N'Etapa 3', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (10, 2, N'Inicio', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (11, 2, N'Crecimiento 1', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (12, 2, N'Crecimiento 2', 1)
GO
INSERT [CAT].[Pig_stages] ([id_pig_stage], [id_pig_type], [description], [status]) VALUES (13, 2, N'Engorda sin mineral', 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (1, 3, N'Revisión celo', 1, CAST(N'2024-02-20T06:00:00.000' AS DateTime), 1, 21, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (2, 4, N'Mover a jaula de cerdas cargadas', 1, CAST(N'2024-02-20T23:03:59.237' AS DateTime), 1, 1, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (3, 4, N'Visualizar estado', 1, CAST(N'2024-02-22T00:57:21.967' AS DateTime), 1, 80, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (4, 5, N'Mover a jaula de maternidad', 1, CAST(N'2024-02-22T00:58:18.833' AS DateTime), 1, 15, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (5, 5, N'ADE', 1, CAST(N'2024-02-22T00:59:55.267' AS DateTime), 1, 15, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (6, 5, N'Ivermectina', 1, CAST(N'2024-02-22T01:03:40.040' AS DateTime), 1, 7, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (7, 6, N'Moviditasan', 1, CAST(N'2024-02-22T01:06:15.977' AS DateTime), 1, 15, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (8, 6, N'Pecutrin inicio', 1, CAST(N'2024-02-22T01:17:15.847' AS DateTime), 1, 10, 10, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (9, 6, N'Pecutrin final', 1, CAST(N'2024-02-22T01:18:51.457' AS DateTime), 1, 20, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (10, 6, N'Farrosure', 1, CAST(N'2024-02-22T01:22:03.823' AS DateTime), 1, 25, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (11, 6, N'Mover a jaula gestante', 1, CAST(N'2024-02-22T01:22:52.177' AS DateTime), 1, 30, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (12, 7, N'Poner foco', 1, CAST(N'2024-02-22T01:26:02.317' AS DateTime), 1, 1, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (13, 7, N'Descolmillar y descolar', 1, CAST(N'2024-02-22T01:26:59.117' AS DateTime), 1, 2, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (14, 7, N'Hierro y Baycox', 1, CAST(N'2024-02-22T01:28:06.507' AS DateTime), 1, 3, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (15, 7, N'Muesquear', 1, CAST(N'2024-02-22T01:28:41.257' AS DateTime), 1, 4, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (16, 7, N'Quitar foco', 1, CAST(N'2024-02-22T01:29:07.137' AS DateTime), 1, 5, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (17, 7, N'Alimento etapa 2', 1, CAST(N'2024-02-22T01:31:24.757' AS DateTime), 1, 7, 0, 2)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (18, 8, N'Capar lechones', 1, CAST(N'2024-02-22T01:37:10.887' AS DateTime), 1, 13, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (19, 8, N'Vacuna Fostera', 1, CAST(N'2024-02-22T01:38:01.577' AS DateTime), 1, 15, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (20, 8, N'ADE', 1, CAST(N'2024-02-22T01:39:01.360' AS DateTime), 1, 22, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (21, 8, N'Mover a lechonera', 1, CAST(N'2024-02-22T01:39:26.157' AS DateTime), 1, 23, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (22, 9, N'Alimentar con etapa 3', 1, CAST(N'2024-02-22T01:48:52.367' AS DateTime), 1, 1, 7, 2)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (23, 9, N'Fin etapa 3', 1, CAST(N'2024-02-22T01:52:25.487' AS DateTime), 1, 7, 0, 2)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (24, 10, N'Alimento de Inicio', 1, CAST(N'2024-02-22T01:54:54.627' AS DateTime), 1, 1, 30, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (25, 10, N'Desparasitar', 1, CAST(N'2024-02-22T01:57:06.470' AS DateTime), 1, 20, 0, 3)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (26, 10, N'Mover a rancho', 1, CAST(N'2024-02-22T01:57:59.887' AS DateTime), 1, 20, 0, 1)
GO
INSERT [CAT].[Pig_tasks] ([id_pig_task], [id_pig_stage], [description], [status], [created_at], [id_farm], [days], [while_days], [id_stage_task_type]) VALUES (27, 10, N'Fin etapa inicio', 1, CAST(N'2024-02-22T02:05:42.000' AS DateTime), 1, 30, 0, 2)
GO
INSERT [CAT].[pig_types] ([id_pig_type], [description], [status], [id_user]) VALUES (1, N'Lechón', 1, 1)
GO
INSERT [CAT].[pig_types] ([id_pig_type], [description], [status], [id_user]) VALUES (2, N'Engorda', 1, 1)
GO
INSERT [CAT].[pig_types] ([id_pig_type], [description], [status], [id_user]) VALUES (3, N'Gestación y maternidad', 1, 1)
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (1, N'YORK/LANDRACE', 1, 1, CAST(N'2024-02-02T00:00:00.000' AS DateTime), CAST(N'2024-02-02T00:00:00.000' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (2, N'PIETRAIN', 1, 1, CAST(N'2024-02-02T00:00:00.000' AS DateTime), CAST(N'2024-02-02T00:00:00.000' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (3, N'DUROC', 1, 1, CAST(N'2024-02-02T00:00:00.000' AS DateTime), CAST(N'2024-02-02T00:00:00.000' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (4, N'ACD', 1, 1, CAST(N'2024-02-02T00:00:00.000' AS DateTime), CAST(N'2024-02-02T00:00:00.000' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (5, N'F4', 1, 1, CAST(N'2024-02-02T00:00:00.000' AS DateTime), CAST(N'2024-02-02T00:00:00.000' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (6, N'Super Porky', 0, 1, CAST(N'2024-02-02T00:00:00.000' AS DateTime), CAST(N'2024-02-02T06:00:00.000' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (7, N'Orson Well', 0, 1, CAST(N'2024-02-10T18:47:12.643' AS DateTime), CAST(N'2024-02-10T18:47:19.370' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (8, N'Orson', 1, 4, CAST(N'2024-02-13T00:29:31.720' AS DateTime), CAST(N'2024-02-13T00:29:31.720' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (9, N'juan', 1, 2, CAST(N'2024-02-13T17:30:47.070' AS DateTime), CAST(N'2024-02-13T17:30:47.070' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (10, N'ACD', 1, 3, CAST(N'2024-02-13T17:40:42.717' AS DateTime), CAST(N'2024-02-13T17:40:42.717' AS DateTime))
GO
INSERT [CAT].[Races] ([id_race], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (11, N'Pietrain', 1, 2, CAST(N'2024-02-13T17:46:03.103' AS DateTime), CAST(N'2024-02-13T17:46:03.103' AS DateTime))
GO
INSERT [CAT].[Stage_task_types] ([id_stage_task_type], [description], [status]) VALUES (1, N'Movimiento/Intervención', 1)
GO
INSERT [CAT].[Stage_task_types] ([id_stage_task_type], [description], [status]) VALUES (2, N'Alimentación', 1)
GO
INSERT [CAT].[Stage_task_types] ([id_stage_task_type], [description], [status]) VALUES (3, N'Vacuna', 1)
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (1, 1, N'Calostro', 1, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (2, 1, N'Etapa 2', 2, 1, 1, 7, CAST(0.200 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (3, 1, N'Etapa 3', 3, 1, 7, 15, CAST(0.300 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (4, 1, N'Inicio y Etapa 3', 4, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (5, 1, N'Inicio', 5, 1, 15, 30, CAST(1.800 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (6, 2, N'Crecimiento 1', 1, 1, 30, 50, CAST(2.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (7, 2, N'Crecimiento 2', 2, 1, 50, 70, CAST(3.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (8, 2, N'Engorda', 3, 1, 70, 100, CAST(5.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (9, 3, N'Sin Montar', 1, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (10, 3, N'Cargada', 2, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (11, 3, N'Gestación', 3, 1, 0, 0, CAST(1.800 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (12, 3, N'Destetando', 4, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (13, 2, N'Crecimiento 3', 4, 1, 70, 100, CAST(3.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (14, 3, N'Lactancia', 5, 1, 0, 0, CAST(3.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (15, 3, N'Inactiva', 6, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (16, 3, N'Vacía', 7, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[Stage_types] ([id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount]) VALUES (17, 3, N'Cargada sin confirmar', 8, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)))
GO
INSERT [CAT].[task_types] ([id_task_type], [description], [status], [id_farm]) VALUES (1, N'Unica', 1, 1)
GO
INSERT [CAT].[task_types] ([id_task_type], [description], [status], [id_farm]) VALUES (2, N'Recurrente', 1, 1)
GO
INSERT [CAT].[task_types] ([id_task_type], [description], [status], [id_farm]) VALUES (3, N'Días de nacido', 1, 1)
GO
INSERT [CAT].[task_types] ([id_task_type], [description], [status], [id_farm]) VALUES (4, N'Días de parto', 1, 1)
GO
INSERT [CAT].[task_types] ([id_task_type], [description], [status], [id_farm]) VALUES (5, N'Antes de parir', 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (1, 3, 1, N'ADE', 1, CAST(N'2024-01-26T23:04:59.113' AS DateTime), CAST(N'2024-01-26T23:04:59.113' AS DateTime), 29, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (2, 3, 1, N'MOV A JG', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 30, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (3, 3, 1, N'ADE', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 15, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (4, 3, 1, N'E.COLI', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 21, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (5, 3, 1, N'FARROSURE', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 25, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (6, 3, 1, N'PECUTRIN FINAL', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 20, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (7, 3, 1, N'PECUTRIN INICIO', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 10, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (8, 3, 1, N'HIERRO Y BAYCOX', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 2, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (9, 5, 1, N'REDUCIR 50% EL ALIMENTO', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 6, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (10, 3, 1, N'LEVAMISOL + SELENIO', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 15, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (11, 3, 1, N'IVERMECTINA + SELENIO', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 22, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (12, 3, 1, N'MODIVITASAN', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 10, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (13, 5, 1, N'CONFIRMAR PREÃ‘EZ CON APARATO', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 84, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (14, 3, 1, N'MOVER A JAULA LECHONERA', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 30, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (15, 3, 1, N'COMPLEJO B', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 10, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (16, 3, 1, N'DESCOLMILLAR Y DESCOLAR', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 1, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (17, 3, 1, N'FOSTERA', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 30, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (18, 4, 1, N'ALIMENTAR CON ETAPA 2', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 0, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (19, 3, 1, N'CAPAR LECHONES', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 20, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (20, 3, 1, N'FOSTERA', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 22, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (21, 5, 1, N'INICIO EN GESTACION', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 0, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (22, 3, 1, N'QUITAR Y GUARDAR FOCO DE LECHONERA', 1, CAST(N'2024-01-26T23:04:59.123' AS DateTime), CAST(N'2024-01-26T23:04:59.123' AS DateTime), 4, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (23, 3, 1, N'PONER FOCO EN LECHONERA', 1, CAST(N'2024-01-26T23:04:59.127' AS DateTime), CAST(N'2024-01-26T23:04:59.127' AS DateTime), 1, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (24, 5, 1, N'VISUALIZAR ESTADO', 1, CAST(N'2024-01-26T23:04:59.127' AS DateTime), CAST(N'2024-01-26T23:04:59.127' AS DateTime), 30, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (25, 3, 1, N'MUESQUEAR', 1, CAST(N'2024-01-26T23:04:59.127' AS DateTime), CAST(N'2024-01-26T23:04:59.127' AS DateTime), 2, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (26, 3, 1, N'MOV CERDA A  JM', 1, CAST(N'2024-01-26T23:04:59.127' AS DateTime), CAST(N'2024-01-26T23:04:59.127' AS DateTime), 15, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (27, 5, 1, N'REVISION DE CELO', 1, CAST(N'2024-01-26T23:04:59.127' AS DateTime), CAST(N'2024-01-26T23:04:59.127' AS DateTime), 93, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (28, 4, 1, N'COMPLEJO B', 1, CAST(N'2024-01-26T23:04:59.127' AS DateTime), CAST(N'2024-01-26T23:04:59.127' AS DateTime), 15, 3, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (29, 3, 6, N'ADE', 1, CAST(N'2024-01-26T23:04:59.113' AS DateTime), CAST(N'2024-01-26T23:04:59.113' AS DateTime), 29, 2, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (30, 3, 1, N'cambiar de jaula2', 0, CAST(N'2024-02-01T03:19:32.510' AS DateTime), CAST(N'2024-02-01T03:19:53.947' AS DateTime), 10, 1, 1)
GO
INSERT [CAT].[Tasks] ([id_task], [id_task_type], [id_stage_type], [description], [status], [created_at], [updated_at], [days], [id_pig_type], [id_farm]) VALUES (31, 3, 1, N'prueba', 0, CAST(N'2024-02-01T03:25:44.490' AS DateTime), CAST(N'2024-02-01T03:26:17.580' AS DateTime), 1, 1, 1)
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (1, 2, N'C1 P4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-02-03T00:57:54.187' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (2, 1, N'JM 23', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (3, 1, N'jm 16', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (4, 3, N'JM 1', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (5, 3, N'JM 2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (6, 3, N'JM 3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (7, 3, N'JM 4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (8, 3, N'JM 5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (9, 3, N'JM 6', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (10, 3, N'JM 7', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (11, 3, N'JM 8', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (12, 3, N'JM 9', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (13, 3, N'JM 10', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (14, 3, N'JM 11', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (15, 3, N'JM 12', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (16, 3, N'JM 13', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (17, 3, N'JM 14', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (18, 3, N'JM 15', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (19, 3, N'JM 16', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (20, 3, N'JM 17', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (21, 3, N'JM 18', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (22, 3, N'JM 19', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (23, 3, N'JM 20', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (24, 3, N'JM 21', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (25, 3, N'JM 22', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (26, 3, N'JM 23', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (27, 3, N'JM 24', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (28, 3, N'JM 25', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (29, 3, N'JM 26', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (30, 3, N'JM 27', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (31, 3, N'JM 28', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (32, 3, N'JM 29', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (33, 3, N'JM 30', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (34, 3, N'JM 31', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (35, 3, N'JM 32', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (36, 3, N'JM 33', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (37, 3, N'JM 34', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (38, 3, N'JM 35', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (39, 3, N'JM 36', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (40, 3, N'JM 37', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (41, 3, N'JM 38', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (42, 3, N'JM 39', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (43, 3, N'JM 40', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (44, 3, N'JM 41', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (45, 3, N'JM 42', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (46, 3, N'JM 43', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (47, 3, N'JM 44', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (48, 3, N'JM 45', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (49, 3, N'JM 46', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (50, 3, N'JM 47', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (51, 3, N'JM 48', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (52, 3, N'JM 49', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (53, 3, N'JM 50', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (54, 3, N'JM 51', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (55, 3, N'JM 52', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (56, 3, N'JM 53', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (57, 3, N'JM 54', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (58, 3, N'JM 55', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (59, 3, N'JM 56', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (60, 3, N'JM 57', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (61, 3, N'JM 58', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (62, 3, N'JM 59', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (63, 3, N'JM 60', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (64, 3, N'JG 5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (65, 3, N'JG 6', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (66, 3, N'JG 7', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (67, 3, N'JG 8', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (68, 3, N'JG 9', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (69, 3, N'JG 10', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (70, 3, N'JG 11', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (71, 3, N'JG 12', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (72, 3, N'JG 13', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (73, 3, N'JG 15', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (74, 3, N'JG 16', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (75, 3, N'JG 17', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (76, 3, N'JG 18', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (77, 3, N'JG 19', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (78, 3, N'JG 20', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (79, 3, N'JG 21', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (80, 3, N'JG 22', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (81, 3, N'JG 23', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (82, 3, N'JG 24', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (83, 3, N'JG 25', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (84, 3, N'JG 26', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (85, 3, N'JG 27', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (86, 3, N'JG 28', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (87, 3, N'JG 29', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (88, 3, N'JG 30', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (89, 3, N'JG 31', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (90, 3, N'JG 32', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (91, 3, N'JG 33', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (92, 3, N'JG 34', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (93, 3, N'JG 35', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (94, 3, N'JG 36', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (95, 3, N'JG 37', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (96, 3, N'JG 38', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (97, 3, N'JG 39', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (98, 3, N'JG 40', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (99, 3, N'JG 41', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (100, 3, N'JG 42', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (101, 3, N'JG 43', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (102, 3, N'JG 44', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (103, 3, N'JG 45', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (104, 3, N'JG 46', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (105, 3, N'JG 47', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (106, 3, N'JG 48', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (107, 3, N'JG 49', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (108, 3, N'JG 50', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (109, 3, N'JG 51', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (110, 3, N'JG 52', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (111, 3, N'JG 53', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (112, 3, N'JG 54', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (113, 3, N'JG 55', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (114, 3, N'JG 56', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (115, 3, N'JG 57', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (116, 3, N'JG 58', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (117, 3, N'JG 59', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (118, 3, N'JG 60', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (119, 3, N'JG 61', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (120, 3, N'JG 62', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (121, 3, N'JG 63', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (122, 3, N'JG 64', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (123, 3, N'JG 65', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (124, 3, N'JG 66', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (125, 3, N'JG 67', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (126, 3, N'JG 68', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (127, 3, N'JG 69', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (128, 3, N'JG 70', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (129, 3, N'JG 71', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (130, 3, N'JG 72', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (131, 3, N'JG 73', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (132, 3, N'JG 74', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (133, 3, N'JG 75', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (134, 3, N'JG 76', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (135, 3, N'JG 77', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (136, 3, N'JG 78', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (137, 3, N'JG 79', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (138, 3, N'JG 80', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (139, 3, N'JG 81', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (140, 3, N'JG 82', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (141, 3, N'JG 83', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (142, 3, N'JG 84', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (143, 3, N'JG 85', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (144, 3, N'JG 86', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (145, 3, N'JG 87', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (146, 3, N'JG 88', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (147, 3, N'JG 89', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (148, 3, N'JG 90', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (149, 3, N'JG 91', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (150, 3, N'JG 92', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (151, 3, N'JG 93', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (152, 3, N'JG 94', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (153, 3, N'JG 95', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (154, 3, N'JG 96', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (155, 3, N'JG 97', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (156, 3, N'JG 98', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (157, 3, N'JG 99', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (158, 3, N'JG 100', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (159, 3, N'JG 101', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (160, 3, N'JG 102', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (161, 3, N'JG 103', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (162, 3, N'JG 104', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (163, 3, N'JG 105', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (164, 3, N'JG 106', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (165, 3, N'JG 107', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (166, 3, N'JG 108', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (167, 3, N'JG 109', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (168, 3, N'JG 110', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (169, 3, N'JG 111', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (170, 3, N'JG 112', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (171, 3, N'JG 113', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (172, 3, N'JG 114', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (173, 3, N'JG 115', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (174, 3, N'JG 116', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (175, 3, N'JG 117', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (176, 3, N'JG 118', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (177, 3, N'JG 119', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (178, 3, N'JG 120', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (179, 3, N'JG 121', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (180, 3, N'JG 122', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (181, 3, N'JG 123', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (182, 3, N'JG 124', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (183, 3, N'JG 125', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (184, 3, N'JG 126', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (185, 3, N'JG 127', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (186, 3, N'JG 128', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (187, 3, N'JG 129', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (188, 3, N'JG 130', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (189, 3, N'JG 131', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (190, 3, N'JG 132', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (191, 3, N'JG 133', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (192, 3, N'JG 134', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (193, 3, N'JG 135', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (194, 3, N'JG 136', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (195, 3, N'JG 137', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (196, 3, N'JG 138', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (197, 3, N'JG 139', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (198, 3, N'JG 140', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (199, 3, N'JG 141', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (200, 3, N'JG 142', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (201, 3, N'JG 143', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (202, 3, N'JG 144', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (203, 3, N'JG 145', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (204, 3, N'JG 146', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (205, 3, N'JG 147', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (206, 3, N'JG 148', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (207, 3, N'JG 149', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (208, 3, N'JG 150', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (209, 3, N'JG 151', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (210, 3, N'JG 152', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (211, 3, N'JG 153', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (212, 3, N'JG 154', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (213, 3, N'JG 155', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (214, 3, N'JG 156', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (215, 3, N'JG 157', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (216, 3, N'JG 158', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (217, 3, N'JG 159', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (218, 3, N'JG 160', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (219, 3, N'JG 161', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (220, 3, N'JG 162', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (221, 3, N'JG 163', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (222, 3, N'JG 164', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (223, 3, N'JG 165', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (224, 3, N'JG 166', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (225, 3, N'JG 167', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (226, 3, N'JG 168', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (227, 3, N'JG 169', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (228, 3, N'JG 170', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (229, 3, N'JG 171', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (230, 3, N'JG 172', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (231, 3, N'JG 173', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (232, 3, N'JG 174', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (233, 3, N'JG 175', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (234, 3, N'JG 176', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (235, 3, N'JG 177', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (236, 3, N'JG 178', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (237, 3, N'JG 179', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (238, 3, N'JG 180', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (239, 3, N'JG 14', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (240, 1, N'C1 P3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (241, 2, N'SANTAGUEDA 27', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (242, 2, N'SANTAGUEDA 26', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (243, 1, N'JM 5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (244, 1, N'JM 22', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (245, 1, N'JM 21', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (246, 2, N'MESA 5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (247, 2, N'MESA 6', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (248, 2, N'MESA 7', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (249, 2, N'MESA 8', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (250, 2, N'MESA 9', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (251, 2, N'MESA 10', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (252, 2, N'MESA 11', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (253, 2, N'MESA 12', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (254, 2, N'MESA 14', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (255, 2, N'JL 6 Y 7', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (256, 1, N'JM 11', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (257, 2, N'SANTA AGUEDA 5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (258, 1, N'C2 P3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (259, 2, N'SANTAGUEDA 4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (260, 2, N'SANTAGUEDA 3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (261, 2, N'VERRACOS', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (262, 2, N'C1 P2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (263, 2, N'C1 P5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (264, 1, N'JM 29', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (265, 2, N'SANTAGUEDA 24', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (266, 2, N'SANTAGUEDA 23', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (267, 2, N'SANTAGUEDA 22', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (268, 2, N'SANTAGUEDA 21', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (269, 2, N'SANTAGUEDA 20', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (270, 2, N'SANTAGUEDA 19', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (271, 2, N'SANTAGUEDA 18', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (272, 2, N'SANTAGUEDA 17', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (273, 1, N'CAJA 3 PISO 2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (274, 1, N'JM 24', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (275, 1, N'jm 9', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (276, 2, N'vacio', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (277, 3, N'JG 217', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (278, 3, N'JG 219', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (279, 3, N'JG 221', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (280, 3, N'JG 223', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (281, 3, N'JG 225', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (282, 3, N'JG 229', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (283, 3, N'JG 231', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (284, 3, N'JG 233', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (285, 3, N'JG 235', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (286, 3, N'JG 237', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (287, 3, N'JG 239', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (288, 1, N'C2 P4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (289, 1, N'C2 P2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (290, 2, N'SANTAGUEDA 5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (291, 3, N'JG 191', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (292, 3, N'JG 193', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (293, 3, N'JG 195', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (294, 3, N'JG 197', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (295, 3, N'JG 199', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (296, 3, N'JG 201', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (297, 3, N'JG 203', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (298, 3, N'JG 205', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (299, 3, N'207', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (300, 3, N'209', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (301, 3, N'JG 211', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (302, 3, N'JG 213', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (303, 3, N'JG 215', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (304, 3, N'JG 207', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (305, 3, N'JG 209', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (306, 1, N'JM 1', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (307, 1, N'JM 30', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (308, 1, N'AREA CUARENTENA', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (309, 1, N'JM 25', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (310, 1, N'JM 20', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (311, 1, N'JM 28', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (312, 1, N'JM 6', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (313, 2, N'SANTAGUEDA 16', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (314, 2, N'SANTAGUEDA 15', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (315, 2, N'SANTAGUEDA 14', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (316, 2, N'SANTAGUEDA 13', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (317, 2, N'SANTAGUEDA 32', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (318, 2, N'SANTAGUEDA 31', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (319, 2, N'SANTAGUEDA 30', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (320, 2, N'SANTAGUEDA 29', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (321, 2, N'SANTAGUEDA 28', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (322, 2, N'SANTAGUEDA 35', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (323, 2, N'SANTAGUEDA 34', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (324, 2, N'SANTAGUEDA 33', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (325, 1, N'JM 4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (326, 1, N'JM 3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (327, 1, N'JM 7', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (328, 2, N'MESA 21', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (329, 2, N'SANTAGUEDA 39', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (330, 2, N'SANTAGUEDA 38', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (331, 2, N'SANTAGUEDA 37', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (332, 2, N'SANTAGUEDA 36', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (333, 1, N'C2 P1', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (334, 1, N'C2 P6', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (335, 1, N'JM 26', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (336, 2, N'SANTAAGUEDA 7', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (337, 2, N'SANTAAGUEDA 6', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (338, 1, N'C2P5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (339, 2, N'EXHIBICION', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (340, 2, N'MESA 15', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (341, 2, N'JL 9', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (342, 2, N'JL 8', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (343, 1, N'JM19', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (344, 1, N'C1 P1', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (345, 1, N'JM 27', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (346, 2, N'SANTAGUEDA 43', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (347, 2, N'SANTAGUEDA 42', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (348, 2, N'SANTAGUEDA 41', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (349, 2, N'SANTAGUEDA 40', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (350, 2, N'SANTA AGUEDA 4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (351, 2, N'SANTA AGUEDA 3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (352, 1, N'JM 13', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (353, 2, N'SANTAGUEDA 25', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (354, 1, N'C1 P5', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (355, 1, N'CI P4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (356, 1, N'C1 P4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (357, 1, N'CI P2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (358, 1, N'JM 18', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (359, 1, N'JM 17', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (360, 1, N'JM 14', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (361, 3, N'JG 183', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (362, 3, N'JG 185', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (363, 3, N'JG 187', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (364, 3, N'JG 189', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (365, 2, N'SANTAGUEDA 10', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (366, 2, N'SANTAGUEDA 9', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (367, 2, N'SANTAGUEDA 8', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (368, 1, N'JM 15', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (369, 1, N'JM 8', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (370, 1, N'JM 2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (371, 3, N'JG 181', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (372, 2, N'SANTAGUEDA 47', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (373, 2, N'SANTAGUEDA 46', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (374, 2, N'SANTAGUEDA 45', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (375, 2, N'SANTAGUEDA 44', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (376, 2, N'CAJA 1 PISO 2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (377, 2, N'SANTAGUEDA 2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (378, 2, N'SANTAGUEDA 1', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (379, 2, N'SANTAGUEDA 12', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (380, 2, N'SANTAGUEDA 11', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (381, 1, N'JM 10', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (382, 1, N'JM 33', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (383, 1, N'JM 12', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (384, 3, N'JG 4', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (385, 3, N'JG 3', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (386, 3, N'JG 2', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (387, 3, N'JG 1', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (388, 2, N'MESA 13', 1, 1, CAST(N'2024-01-31T15:45:41.937' AS DateTime), CAST(N'2024-01-31T15:45:41.937' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (389, 2, N'C1 P4', 1, 1, CAST(N'2024-01-31T00:00:00.000' AS DateTime), CAST(N'2024-01-31T00:00:00.000' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (390, 3, N'nueva jaula', 0, 1, CAST(N'2024-01-31T22:55:34.863' AS DateTime), CAST(N'2024-01-31T22:55:34.863' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (391, 2, N'jaula nueva', 0, 1, CAST(N'2024-01-31T23:12:28.013' AS DateTime), CAST(N'2024-01-31T23:13:48.497' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (392, 3, N'jaula nueva', 0, 0, CAST(N'2024-02-03T00:58:07.193' AS DateTime), CAST(N'2024-02-03T00:58:07.193' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (393, 3, N'JM 2', 1, 0, CAST(N'2024-02-13T17:18:54.970' AS DateTime), CAST(N'2024-02-13T17:18:54.970' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (394, 3, N'JM 3', 1, 0, CAST(N'2024-02-13T17:20:14.497' AS DateTime), CAST(N'2024-02-13T17:20:14.497' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (395, 3, N'JM 4', 1, 0, CAST(N'2024-02-13T17:22:01.477' AS DateTime), CAST(N'2024-02-13T17:22:01.477' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (396, 3, N'JM 1', 1, 2, CAST(N'2024-02-13T17:37:54.837' AS DateTime), CAST(N'2024-02-13T17:37:54.837' AS DateTime))
GO
INSERT [CAT].[Ubications] ([id_ubication], [id_pig_type], [description], [status], [id_farm], [created_at], [updated_at]) VALUES (397, 3, N'JM 1', 1, 3, CAST(N'2024-02-13T17:41:12.547' AS DateTime), CAST(N'2024-02-13T17:41:12.547' AS DateTime))
GO
INSERT [CAT].[Weight_types] ([id_weight_type], [description], [status]) VALUES (1, N'Sobrepeso', 1)
GO
INSERT [CAT].[Weight_types] ([id_weight_type], [description], [status]) VALUES (2, N'Adecuado', 1)
GO
INSERT [CAT].[Weight_types] ([id_weight_type], [description], [status]) VALUES (3, N'Desnutrida', 1)
GO
INSERT [MOD].[Births] ([id_birth], [id_pig], [id_stallion], [birth_date], [confirm_date], [crossing_date], [is_positive], [alive], [dead], [description], [status], [created_at], [id_user], [id_user_confirm], [id_user_birth], [id_fertilization_type], [id_birth_type], [comment], [closed]) VALUES (1, 1, 1, CAST(N'2024-06-20T06:00:00.000' AS DateTime), CAST(N'2024-05-28T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 1, 7, 2, N'', 1, CAST(N'2024-02-27T20:43:55.890' AS DateTime), 1, 1, 1, 1, 1, N'', 0)
GO
INSERT [MOD].[Growing_pigs] ([id_growing_lot], [id_pig_stage], [id_ubication], [quantity], [created_at], [exit_date], [id_user], [closed], [status], [average_weight], [id_farm], [start_date]) VALUES (1, 11, 2, 7, CAST(N'2024-03-16T06:00:00.000' AS DateTime), CAST(N'2024-03-16T06:00:00.000' AS DateTime), 1, 0, 1, CAST(130.00 AS Decimal(9, 2)), 1, CAST(N'2024-03-16T06:00:00.000' AS DateTime))
GO
INSERT [MOD].[Growing_pigs] ([id_growing_lot], [id_pig_stage], [id_ubication], [quantity], [created_at], [exit_date], [id_user], [closed], [status], [average_weight], [id_farm], [start_date]) VALUES (2, 12, 3, 8, CAST(N'2024-03-16T06:00:00.000' AS DateTime), CAST(N'2024-03-16T06:00:00.000' AS DateTime), 1, 0, 1, CAST(150.00 AS Decimal(9, 2)), 1, CAST(N'2024-03-16T06:00:00.000' AS DateTime))
GO
INSERT [MOD].[Growing_pigs] ([id_growing_lot], [id_pig_stage], [id_ubication], [quantity], [created_at], [exit_date], [id_user], [closed], [status], [average_weight], [id_farm], [start_date]) VALUES (3, 9, 1, 0, CAST(N'2024-03-20T03:44:39.633' AS DateTime), CAST(N'2024-08-20T03:44:39.633' AS DateTime), 1, 0, 1, CAST(80.00 AS Decimal(9, 2)), 0, CAST(N'2024-03-20T03:44:39.633' AS DateTime))
GO
INSERT [MOD].[Lot_Piglets] ([id_lot_piglets], [id_birth], [quantity], [created_at], [id_user], [id_ubication], [id_pig_stage], [code], [status], [closed], [id_farm], [close_date]) VALUES (1, 1, 7, CAST(N'2024-02-27T20:44:30.930' AS DateTime), 1, 1, 7, N'0001', 1, 1, 1, CAST(N'2024-02-27T20:44:30.930' AS DateTime))
GO
INSERT [MOD].[Pigs] ([id_pig], [id_pig_type], [id_ubication], [id_race], [code], [added_date], [visible], [id_farm], [id_pig_stage], [status], [created_at], [id_stallion], [id_weight_type], [bar_code]) VALUES (1, 3, 1, 1, N'0001', CAST(N'2024-02-27T20:43:42.020' AS DateTime), 1, 1, 6, 1, CAST(N'2024-02-27T20:43:44.510' AS DateTime), 2, 2, N'900263000321232')
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (1, 1, 1, 0, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (2, 1, 1, 0, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (3, 2, 1, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (4, 2, 2, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (5, 3, 6, 0, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (6, 2, 3, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (7, 2, 4, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (8, 2, 5, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (9, 2, 6, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (12, 3, 4, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (13, 3, 5, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (14, 4, 7, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (15, 2, 7, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (16, 2, 8, 0, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (17, 5, 1, 1, 3)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (18, 2, 1, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (19, 2, 2, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (20, 2, 3, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (21, 2, 4, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (22, 2, 5, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (23, 2, 6, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (24, 2, 7, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (25, 2, 8, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (26, 3, 1, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (27, 3, 2, 1, 5)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (28, 5, 1, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (29, 2, 2, 1, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (30, 3, 6, 1, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (31, 6, 1, 0, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (32, 6, 2, 0, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (33, 6, 3, 0, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (34, 6, 4, 1, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (35, 6, 5, 1, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (36, 6, 6, 1, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (37, 6, 7, 0, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (38, 6, 8, 1, 6)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (39, 2, 8, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (40, 2, 9, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (41, 2, 10, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (42, 2, 11, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (43, 2, 12, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (44, 2, 13, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (45, 2, 14, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (46, 2, 15, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (47, 3, 1, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (48, 2, 16, 1, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (10, 2, 7, 0, 1)
GO
INSERT [MOD].[Role_access_routes] ([id_role_access], [id_role], [id_access], [status], [id_farm]) VALUES (11, 2, 8, 0, 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (1, 1, 1, N'Calostro', 1, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (2, 2, 1, N'Etapa 2', 2, 1, 1, 7, CAST(0.200 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (3, 3, 1, N'Etapa 3', 3, 1, 7, 15, CAST(0.300 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (4, 4, 1, N'Inicio y Etapa 3', 4, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (5, 5, 1, N'Inicio', 5, 1, 15, 30, CAST(1.800 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (6, 6, 2, N'Crecimiento 1', 1, 1, 30, 50, CAST(2.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (7, 7, 2, N'Crecimiento 2', 2, 1, 50, 70, CAST(3.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (8, 8, 2, N'Engorda', 3, 1, 70, 100, CAST(5.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (9, 9, 3, N'Sin Montar', 1, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (10, 10, 3, N'Cargada', 2, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (11, 11, 3, N'Gestación', 3, 1, 0, 0, CAST(1.800 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (12, 12, 3, N'Destetando', 4, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (13, 13, 2, N'Crecimiento 3', 4, 1, 70, 100, CAST(3.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (14, 14, 3, N'Lactancia', 5, 1, 0, 0, CAST(3.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (15, 15, 3, N'Inactiva', 6, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (16, 16, 3, N'Vacía', 7, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stages] ([id_stage], [id_stage_type], [id_pig_type], [description], [order], [status], [min_weight], [max_weight], [food_amount], [id_farm]) VALUES (17, 17, 3, N'Cargada sin confirmar', 8, 1, 0, 0, CAST(0.000 AS Decimal(6, 3)), 1)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (1, N'Jhony', 1, 1, 2, CAST(N'2024-02-06T06:00:00.000' AS DateTime), 1)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (2, N'Hercules', 1, 1, 1, CAST(N'2024-02-06T06:00:00.000' AS DateTime), 1)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (3, N'Emilio', 0, 0, 1, CAST(N'2024-02-08T02:23:07.397' AS DateTime), 1)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (4, N'Juancho', 1, 0, 8, CAST(N'2024-02-13T17:15:11.897' AS DateTime), 4)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (5, N'Jose', 1, 0, 9, CAST(N'2024-02-13T17:36:53.300' AS DateTime), 2)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (6, N'Brutus', 1, 0, 10, CAST(N'2024-02-13T17:40:57.933' AS DateTime), 3)
GO
INSERT [MOD].[Stallions] ([id_stallion], [name], [status], [id_ubication], [id_race], [created_at], [id_farm]) VALUES (7, N'Miguel', 1, 0, 11, CAST(N'2024-02-13T17:46:29.983' AS DateTime), 2)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (1, 1, 1, 1, CAST(N'2024-03-19T06:00:00.000' AS DateTime), CAST(N'2024-03-19T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'probando comentarios', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (2, 1, 2, 1, CAST(N'2024-02-28T06:00:00.000' AS DateTime), CAST(N'2024-02-28T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'segundo comentario', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (3, 1, 3, 1, CAST(N'2024-05-17T06:00:00.000' AS DateTime), CAST(N'2024-05-17T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (4, 1, 4, 1, CAST(N'2024-03-13T06:00:00.000' AS DateTime), CAST(N'2024-03-13T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (5, 1, 5, 1, CAST(N'2024-03-13T06:00:00.000' AS DateTime), CAST(N'2024-03-13T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (6, 1, 6, 1, CAST(N'2024-03-05T06:00:00.000' AS DateTime), CAST(N'2024-03-05T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (7, 1, 7, 1, CAST(N'2024-03-13T06:00:00.000' AS DateTime), CAST(N'2024-03-13T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (8, 1, 8, 1, CAST(N'2024-03-08T06:00:00.000' AS DateTime), CAST(N'2024-03-18T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (9, 1, 9, 1, CAST(N'2024-03-18T06:00:00.000' AS DateTime), CAST(N'2024-03-18T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (10, 1, 10, 1, CAST(N'2024-03-23T06:00:00.000' AS DateTime), CAST(N'2024-03-23T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (11, 1, 11, 1, CAST(N'2024-03-28T06:00:00.000' AS DateTime), CAST(N'2024-03-28T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, NULL)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (12, NULL, 12, 1, CAST(N'2024-02-28T06:00:00.000' AS DateTime), CAST(N'2024-02-28T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'no hay focos', 1, 1)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (13, NULL, 13, 1, CAST(N'2024-02-29T06:00:00.000' AS DateTime), CAST(N'2024-02-29T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'faltaron 2', 1, 1)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (14, NULL, 14, 1, CAST(N'2024-03-01T06:00:00.000' AS DateTime), CAST(N'2024-03-01T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, 1)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (15, NULL, 15, 1, CAST(N'2024-03-02T06:00:00.000' AS DateTime), CAST(N'2024-03-02T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, 1)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (16, NULL, 16, 1, CAST(N'2024-03-03T06:00:00.000' AS DateTime), CAST(N'2024-03-03T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, 1)
GO
INSERT [MOD].[Tasks] ([id_task], [id_pig], [id_pig_task], [id_user], [start_date], [end_date], [created_at], [done], [comment], [status], [id_lot_piglets]) VALUES (17, NULL, 17, 1, CAST(N'2024-03-05T06:00:00.000' AS DateTime), CAST(N'2024-03-05T06:00:00.000' AS DateTime), CAST(N'2024-02-27T06:00:00.000' AS DateTime), 0, N'', 1, 1)
GO
INSERT [RH].[Farms] ([id_farm], [name], [address], [id_user], [zip], [phone], [status], [created_at]) VALUES (1, N'granja 101', N'rio misantla', 1, N'1234k', N'12345ty', 1, CAST(N'2024-01-15T17:14:18.913' AS DateTime))
GO
INSERT [RH].[Farms] ([id_farm], [name], [address], [id_user], [zip], [phone], [status], [created_at]) VALUES (2, N'granja 44', N'tepeyac', 1, N'1234k', N'12345ty', 1, CAST(N'2024-01-15T17:14:18.913' AS DateTime))
GO
INSERT [RH].[Farms] ([id_farm], [name], [address], [id_user], [zip], [phone], [status], [created_at]) VALUES (3, N'farm 4', N'Rio Misantla manzana 11 lote 4 entre Rio Uxpanapa/Rio Jamapa', 1, N'93230', N'7828802912', 1, CAST(N'2024-01-15T17:14:18.913' AS DateTime))
GO
INSERT [RH].[Farms] ([id_farm], [name], [address], [id_user], [zip], [phone], [status], [created_at]) VALUES (4, N'orson farmer', N'Rio Misantla manzana 11 lote 4 entre Rio Uxpanapa/Rio Jamapa', 1, N'93230', N'7828802912', 1, CAST(N'2024-01-15T17:58:17.617' AS DateTime))
GO
INSERT [RH].[Farms] ([id_farm], [name], [address], [id_user], [zip], [phone], [status], [created_at]) VALUES (5, N'Granja Manuel', N'Mollejon', 6, N'93230', N'7828802912', 1, CAST(N'2024-01-30T23:17:58.423' AS DateTime))
GO
INSERT [RH].[Farms] ([id_farm], [name], [address], [id_user], [zip], [phone], [status], [created_at]) VALUES (6, N'Granja Manuel 2', N'BLVD. ADOLFO RUÍZ CORTINES 4499', 6, N'93306', N'7821115341', 1, CAST(N'2024-01-30T23:47:15.713' AS DateTime))
GO
INSERT [RH].[Job_positions] ([id_job_position], [description], [status], [id_company]) VALUES (1, N'Operador', 1, 2)
GO
INSERT [RH].[Roles] ([id_role], [description], [status], [id_user]) VALUES (1, N'Super Administrador', 1, 1)
GO
INSERT [RH].[Roles] ([id_role], [description], [status], [id_user]) VALUES (2, N'Administrador', 1, 1)
GO
INSERT [RH].[Roles] ([id_role], [description], [status], [id_user]) VALUES (3, N'Operador', 1, 1)
GO
INSERT [RH].[Roles] ([id_role], [description], [status], [id_user]) VALUES (4, N'Vendedor', 1, 1)
GO
INSERT [RH].[Roles] ([id_role], [description], [status], [id_user]) VALUES (5, N'Tesorero', 1, 1)
GO
INSERT [RH].[Roles] ([id_role], [description], [status], [id_user]) VALUES (6, N'Supervisor', 1, 1)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (1, N'juan', N'juan@gmail.com', N'7828802912', N'image.jpg', N'$2b$10$eIqo4oPaTxOE4fPXIg4SEOGGqSxRrOVXS8dFolPi69iWGF3cfamEG', 1, CAST(N'2023-12-12T00:00:00.000' AS DateTime), CAST(N'2023-12-12T00:00:00.000' AS DateTime), 1, 1, N'93230', N'mollejon', 2, 0, 1)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (2, N'Maria Lopez Garcia', N'maria@gmail.com', N'7828802912', N'image.jpg', N'$2b$10$gokto3cF9IJL1Mn9PBTfh.Ca2cPwpjlGieaPt8qBsYbVCUcFP9sG6', 2, CAST(N'2023-12-12T00:00:00.000' AS DateTime), CAST(N'2024-02-09T16:28:29.477' AS DateTime), 1, 1, N'', N'mollejon', 0, 1, 0)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (3, N'Luis Guillermo', N'luis@gmail.com', N'7828802912', N'', N'$2b$10$nbe8hQVf2Mzc2W0M6nra1OVWa/VbSo.HIoZQlEuJKXt1IGU5Be0HO', 3, CAST(N'2024-01-19T19:47:33.673' AS DateTime), CAST(N'2024-01-25T18:23:24.093' AS DateTime), 1, 1, N'', N'Rio Misantla manzana 11 lote 4 entre Rio Uxpanapa/Rio Jamapa', 0, 0, 1)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (4, N'Miguel Barragan García', N'miguel@gmail.com', N'7828802912', N'', N'$2b$10$Ig0zMZVK6P2N3SFwzcJsUeynkVOpNkyMmDjgjAA7llpxWBe22HL4i', 3, CAST(N'2024-01-21T18:35:17.923' AS DateTime), CAST(N'2024-01-26T19:01:08.863' AS DateTime), 1, 1, N'', N'', 0, 1, 0)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (5, N'lalo', N'lalo@gmail.com', N'7828802912', N'', N'$2b$10$6fdHqu2xStZvjuiARLGSwO/E/rgXpqS.stGZgGTj7Paybg97CrF0y', 3, CAST(N'2024-01-21T19:30:18.230' AS DateTime), CAST(N'2024-01-21T19:30:18.230' AS DateTime), 1, 1, N'', N'', 0, 2, 0)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (6, N'Manuel García', N'manuel@test.com', N'7821115341', N'', N'$2b$10$yBSDbq5V7wV1NulUZR6pieJl9JfnTxKzySldkmvi7WIcrOh.wAOty', 1, CAST(N'2024-01-30T23:16:36.673' AS DateTime), CAST(N'2024-01-30T23:16:36.673' AS DateTime), 1, 1, N'93306', N'BLVD. ADOLFO RUÍZ CORTINES 4499', 30, 0, 1)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (7, N'yazmin', N'yazmin@gmail.com', N'7828802912', N'', N'$2b$10$nYEQ7ckTKsjuWoBnasM7kewxSac80ShELPBW3Nq7iRHWLtSjAMuo2', 3, CAST(N'2024-01-30T23:44:48.823' AS DateTime), CAST(N'2024-01-30T23:44:48.823' AS DateTime), 1, 1, N'', N'', 0, 5, 0)
GO
INSERT [RH].[Users] ([id_user], [name], [email], [phone], [img_url], [password], [id_role], [created_at], [updated_at], [status], [is_active], [zip], [address], [id_state], [id_farm], [is_company]) VALUES (8, N'lucia', N'lucia@gmail.com', N'7828802912', N'', N'$2b$10$V4Od77dg54uFw6S0gkpk3OqAeeTIy6eR07qb1zFfNFwIr3Js5S52C', 6, CAST(N'2024-01-30T23:49:30.730' AS DateTime), CAST(N'2024-01-30T23:49:30.730' AS DateTime), 1, 1, N'', N'', 0, 6, 0)
GO
SET IDENTITY_INSERT [SAT].[Cat_states] ON 
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (1, N'01', N'Aguascalientes', N'AGU', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (2, N'02', N'Baja California', N'BCN', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (3, N'03', N'Baja California Sur', N'BCS', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (4, N'04', N'Campeche', N'CAM', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (5, N'05', N'Coahuila de Zaragoza', N'COA', 1)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (6, N'06', N'Colima', N'COL', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (7, N'07', N'Chiapas', N'CHP', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (8, N'08', N'Chihuahua', N'CHH', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (9, N'09', N'Ciudad de México', N'CMX', 1)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (10, N'10', N'Durango', N'DUR', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (11, N'11', N'Guanajuato', N'GUA', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (12, N'12', N'Guerrero', N'GRO', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (13, N'13', N'Hidalgo', N'HID', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (14, N'14', N'Jalisco', N'JAL', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (15, N'15', N'México', N'MEX', 1)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (16, N'16', N'Michoacán de Ocampo', N'MIC', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (17, N'17', N'Morelos', N'MOR', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (18, N'18', N'Nayarit', N'NAY', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (19, N'19', N'Nuevo León', N'NLE', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (20, N'20', N'Oaxaca', N'OAX', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (21, N'21', N'Puebla', N'PUE', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (22, N'22', N'Querétaro', N'QUE', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (23, N'23', N'Quintana Roo', N'ROO', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (24, N'24', N'San Luis Potosí', N'SLP', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (25, N'25', N'Sinaloa', N'SIN', 1)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (26, N'26', N'Sonora', N'SON', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (27, N'27', N'Tabasco', N'TAB', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (28, N'28', N'Tamaulipas', N'TAM', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (29, N'29', N'Tlaxcala', N'TLA', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (30, N'30', N'Veracruz de Ignacio de la Llave', N'VER', 1)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (31, N'31', N'Yucatán', N'YUC', 0)
GO
INSERT [SAT].[Cat_states] ([id_state], [string_key], [description], [state_key], [status]) VALUES (32, N'32', N'Zacatecas', N'ZAC', 0)
GO
SET IDENTITY_INSERT [SAT].[Cat_states] OFF
GO
ALTER TABLE [MOD].[Tasks]  WITH CHECK ADD  CONSTRAINT [fk_pig_tasks_Pigs_1] FOREIGN KEY([id_pig])
REFERENCES [MOD].[Pigs] ([id_pig])
GO
ALTER TABLE [MOD].[Tasks] CHECK CONSTRAINT [fk_pig_tasks_Pigs_1]
GO
