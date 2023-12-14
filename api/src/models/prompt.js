module.exports = function (sequelize, DataTypes) {
  const Prompt = sequelize.define('Prompt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Chat',
        key: 'id'
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Autor".'
        }
      }
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Prompt".'
        }
      }
    }
  }, {
    sequelize,
    tableName: 'prompts',
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
        name: 'prompt_chatId_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'chatId' }
        ]
      }
    ]
  })

  Prompt.associate = function (models) {
    Prompt.belongsTo(models.Chat, { as: 'chat', foreignKey: 'chatId' })
  }

  return Prompt
}
