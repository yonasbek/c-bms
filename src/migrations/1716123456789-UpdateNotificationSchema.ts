import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateNotificationSchema1716123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the user_notifications table
        await queryRunner.query(`DROP TABLE IF EXISTS user_notifications`);

        // Add userId column to notifications table
        await queryRunner.query(`ALTER TABLE notifications ADD COLUMN userId INT NULL`);
        
        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE notifications 
            ADD CONSTRAINT FK_notifications_users 
            FOREIGN KEY (userId) REFERENCES user(id)
        `);

        // Drop is_individual column
        await queryRunner.query(`ALTER TABLE notifications DROP COLUMN is_individual`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add is_individual column back
        await queryRunner.query(`ALTER TABLE notifications ADD COLUMN is_individual BOOLEAN DEFAULT FALSE`);
        
        // Drop foreign key constraint
        await queryRunner.query(`ALTER TABLE notifications DROP FOREIGN KEY FK_notifications_users`);
        
        // Drop userId column
        await queryRunner.query(`ALTER TABLE notifications DROP COLUMN userId`);
        
        // Recreate user_notifications table
        await queryRunner.query(`
            CREATE TABLE user_notifications (
                id INT PRIMARY KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                notificationId INT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                FOREIGN KEY (userId) REFERENCES user(id),
                FOREIGN KEY (notificationId) REFERENCES notifications(id)
            )
        `);
    }
} 