create table svl_rds.user_tb
(
    birthday      date                 null,
    social_user   bit                  not null,
    streak_days   int                  not null,
    total_days    int                  not null,
    user_id       bigint auto_increment
        primary key,
    email         varchar(255)         null,
    nickname      varchar(255)         not null,
    password      varchar(255)         null,
    profile_image varchar(255)         null,
    login_id      varchar(20)          null,
    is_deleted    tinyint(1) default 0 not null,
    constraint UK2dlfg6wvnxboknkp9d1h75icb
        unique (email),
    constraint UK8vwqxphwus8seox6f4e2w0wxm
        unique (nickname)
);

create table svl_rds.folder_tb
(
    is_default  bit          not null,
    is_favorite bit          not null,
    folder_id   bigint auto_increment
        primary key,
    user_id     bigint       not null,
    description varchar(255) null,
    name        varchar(255) null,
    thumbnail   varchar(255) null,
    is_deleted  tinyint      not null,
    word_count  int          not null,
    constraint FKcv1mwbqqyyr41oej15gqokvlo
        foreign key (user_id) references svl_rds.user_tb (user_id)
);

create table svl_rds.friend_tb
(
    friend_id bigint                       not null,
    id        bigint auto_increment
        primary key,
    user_id   bigint                       not null,
    status    enum ('APPROVED', 'PENDING') null,
    constraint FKdk1b7xoo3kypxsnw1j86me3kg
        foreign key (friend_id) references svl_rds.user_tb (user_id),
    constraint FKn6l2u07wflolvqcpw0qfmpyu2
        foreign key (user_id) references svl_rds.user_tb (user_id)
);

create table svl_rds.social_login_tb
(
    social_login_id bigint auto_increment
        primary key,
    social_uid      varchar(200)                      not null,
    user_id         bigint                            null,
    provider        enum ('GOOGLE', 'KAKAO', 'NAVER') null,
    constraint FK3f83y634loypwvanfugeel8v6
        foreign key (user_id) references svl_rds.user_tb (user_id)
);

create table svl_rds.study_history_tb
(
    created_at       datetime(6) null,
    study_history_id bigint auto_increment
        primary key,
    user_user_id     bigint      null,
    constraint FKj5xaon86ms5488j0a3hykhu96
        foreign key (user_user_id) references svl_rds.user_tb (user_id)
);

create definer = admin@`%` trigger svl_rds.after_user_insert
    after insert
    on svl_rds.user_tb
    for each row
BEGIN
    INSERT INTO folder_tb (user_id, name, description, is_default)
    VALUES (NEW.user_id, '기본 폴더', '오늘의 학습 단어장', TRUE);
END;

create table svl_rds.word_tb
(
    is_deleted   bit          not null,
    user_id      bigint       not null,
    word_id      bigint auto_increment
        primary key,
    audio_url    varchar(255) null,
    image_url    varchar(255) not null,
    name_en      varchar(255) not null,
    name_ko      varchar(255) not null,
    folder_count int          not null,
    constraint FKdwnpmatx1ed3u55krqbrtgh4e
        foreign key (user_id) references svl_rds.user_tb (user_id)
);

create table svl_rds.folder_word_tb
(
    folder_id bigint not null,
    id        bigint auto_increment
        primary key,
    word_id   bigint not null,
    constraint FKoni2gnkxdulgbbnlo2wplj2u2
        foreign key (word_id) references svl_rds.word_tb (word_id),
    constraint FKprgba0h101b5uhaqw0hisvald
        foreign key (folder_id) references svl_rds.folder_tb (folder_id)
);

create table svl_rds.quiz_tb
(
    problem_number int         not null,
    created_at     datetime(6) null,
    quiz_id        bigint auto_increment
        primary key,
    word_id        bigint      not null,
    constraint fk_quiz_tb_word
        foreign key (word_id) references svl_rds.word_tb (word_id)
);

create table svl_rds.quiz_order_tb
(
    id      bigint auto_increment
        primary key,
    quiz_id bigint not null,
    user_id bigint not null,
    constraint FK545c9rk1232rtui2sfhwbvg2e
        foreign key (quiz_id) references svl_rds.quiz_tb (quiz_id),
    constraint FKcb9fctn7ou3fbkedinkln3nv1
        foreign key (user_id) references svl_rds.user_tb (user_id)
);

