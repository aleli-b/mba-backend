const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'dailyReport',
        {
            id: {
                type: DataTypes.FLOAT,
                primaryKey: true,
                allowNull: false,
            },
            date_value: {
                type: DataTypes.JSONB, // Use JSONB data type to store key-value pairs
                allowNull: false,
              },
            group_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_have_story: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            'gift coins': {
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'gift_coins'
            },
            host_wall_coins: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            friend_video_coins: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            'task coins': {
                type: DataTypes.FLOAT,
                allowNull: false,
                field:'task_coins'
            },
            box_coins: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            // 'total coins-Apr 11th': {
            //     type: DataTypes.FLOAT,
            //     allowNull: false,
            //     field: 'total_coins_Apr_11th',
            // },
            group_time: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            match_count: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            match_times_duration: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            kyc_pass: {
                type: DataTypes.STRING,
                allowNull: true
            },
            video_status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            'avg_friend_call_video_time-30days': {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'avg_friend_call_video_time_30days'
            },
            'avg_friend_call_video_time': {
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'avg_friend_call_video_time_30days'
            },
            bank_country_ab: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            long_call_ratio: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            // 'total coins-Apr 10th-Apr 11th': {
            //     type: DataTypes.FLOAT,
            //     allowNull: false,
            //     field: 'total_coins_Apr_10th_Apr_11th'
            // }
        },
        {
            underscored: true,
        }
    );
};
