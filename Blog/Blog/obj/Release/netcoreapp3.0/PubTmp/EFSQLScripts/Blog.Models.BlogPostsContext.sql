IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200218121435_Initial')
BEGIN
    CREATE TABLE [BlogPost] (
        [Id] int NOT NULL IDENTITY,
        [AuthorName] nvarchar(max) NOT NULL,
        [Text] nvarchar(max) NOT NULL,
        [CreateAt] datetime2 NOT NULL,
        CONSTRAINT [PK_BlogPost] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200218121435_Initial')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200218121435_Initial', N'3.0.0');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200220101340_Added_BlogPostComments_Table')
BEGIN
    CREATE TABLE [BlogPostComment] (
        [Id] int NOT NULL IDENTITY,
        [AuthorName] nvarchar(max) NOT NULL,
        [Text] nvarchar(max) NOT NULL,
        [CreateAt] datetime2 NOT NULL,
        [BlogPostId] int NULL,
        CONSTRAINT [PK_BlogPostComment] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_BlogPostComment_BlogPost_BlogPostId] FOREIGN KEY ([BlogPostId]) REFERENCES [BlogPost] ([Id]) ON DELETE NO ACTION
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200220101340_Added_BlogPostComments_Table')
BEGIN
    CREATE INDEX [IX_BlogPostComment_BlogPostId] ON [BlogPostComment] ([BlogPostId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200220101340_Added_BlogPostComments_Table')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200220101340_Added_BlogPostComments_Table', N'3.0.0');
END;

GO

