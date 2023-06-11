const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'dailyReport',
        {
            db_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            id: {
                type: DataTypes.BIGINT,                
                allowNull: false,
            },
            date_value: {
                type: DataTypes.JSONB, 
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
            'gift coins': { //IMPORTANTE 
                type: DataTypes.FLOAT,
                allowNull: false,
                field: 'gift_coins'
            },
            host_wall_coins: { //IMPORTANTE
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            friend_video_coins: { //IMPORTANTE
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            'task coins': { //IMPORTANTE
                type: DataTypes.FLOAT,
                allowNull: false,
                field:'task_coins'
            },
            box_coins: { //IMPORTANTE
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
            match_count: { //IMPORTANTE
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            match_times_duration: { //?
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
            category: { //IMPORTANTE
                type: DataTypes.STRING,
                allowNull: false,
            },
            'avg_friend_call_video_time-30days': { //IMPORTANTE
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'avg_friend_call_video_time_30days'
            },
            'avg_friend_call_video_time': {  //IMPORTANTE
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'avg_friend_call_video_time_30days'
            },
            bank_country_ab: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            long_call_ratio: { //?
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
