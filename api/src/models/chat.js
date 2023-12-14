module.exports = function (sequelize, DataTypes) {
  const Chat = sequelize.define('Chat', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assistantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assistant',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'id'
      }
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Resumen".'
        }
      }
    },
    thread: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Hilo".'
        }
      }
    }
  }, {
    sequelize,
    tableName: 'chats',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'chat_assistantId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'assistantId' }
        ]
      },
      {
        name: 'chat_customerId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      }
    ]
  })

  Chat.associate = function (models) {
    Chat.belongsTo(models.Assistant, { as: 'assistant', foreignKey: 'assistantId' })
    Chat.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
    Chat.hasMany(models.Prompt, { as: 'prompts', foreignKey: 'chatId' })
  }

  return Chat
}
