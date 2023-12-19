module.exports = function (sequelize, DataTypes) {
  const Customer = sequelize.define('Customer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Nombre".'
        }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Apellido".'
        }
      }
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Teléfono".'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Email".'
        },
        isEmail: {
          msg: 'Por favor, rellena el campo "Email" con un email válido.'
        },
        isUnique: function (value, next) {
          const self = this
          Customer.findOne({ where: { email: value } })
            .then(function (customer) {
              if (customer && self.id !== customer.id) {
                return next('Ya existe un cliente con ese email.')
              }
              return next()
            })
            .catch(function (err) {
              return next(err)
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "password".'
        }
      }
    }
  }, {
    sequelize,
    tableName: 'customers',
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
        name: 'customer_email_fk',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'email' }
        ]
      }
    ]
  })

  Customer.associate = function (models) {
    Customer.hasMany(models.Chat, { as: 'chats', foreignKey: 'assistantId' })
  }

  return Customer
}
