# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  config.openapi_root = Rails.root.join('swagger').to_s
  config.openapi_specs = {
    'v1/swagger.json' => {
      openapi: '3.0.3',
      info: {
        title: 'API V1',
        version: 'v1'
      },
      paths: {},
      servers: [
        {
          url: 'http://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'icfc.localhost:3010/api'
            }
          }
        }
      ],
      components: {
        securitySchemes: {
          Bearer: {
            description: 'JWT key necessary to use API calls',
            type: :apiKey,
            name: 'Authorization',
            in: :header
          }
        },
        schemas: {
          not_found: {
            type: 'object',
            properties: {
              message: { type: :string }
            }
          },
          loginPayload: {
            type: 'object',
            required: [:email],
            properties: {
              email: {
                type: :string,
                example: 'test@gmail.com'
              },
              password: {
                type: :string,
                format: :password
              }
            }
          },
          passwordResetPayload: {
            type: 'object',
            properties: {
              password_reset_token: {
                type: :string,
                format: :password
              }, password: {
                type: :string,
                format: :password
              }, password_confirmation: {
                type: :string,
                format: :password
              }
            }
          },
          signupPayload: {
            type: 'object',
            required: [:email],
            properties: {
              firstname: {
                type: :string,
                example: ''
              },
              lastname: {
                type: :string,
                example: ''
              },
              phonenumber: {
                type: :string
              },
              username: {
                type: :string,
                example: ''
              },
              email: {
                type: :string,
                example: 'test@gmail.com'
              },
              password: {
                type: :password
              },
              password_confirmation: {
                type: :password
              }
            }
          },
          # Define a base model schema to reduce repetition in other models
          baseModel: {
            type: 'object',
            properties: {
              id: {
                type: :number
              },
              created_at: {
                type: :string,
                format: :datetime
              },
              updated_at: {
                type: :string,
                format: :datetime
              }
            }
          },
          createUpdateBaseModel: {
            properties: {
              user_id: {
                type: :number
              }
            }
          },
          attachmentBaseModel: {
            properties: {
              url: {
                type: :string
              },
              thumb: {
                type: :object
              },
              large: {
                type: :object
              }
            }
          },
          author: {
            type: 'object',
            properties: {
              id: {
                type: :number
              },
              email: {
                type: :string,
                format: :email
              },
              username: {
                type: :string
              },
              created_at: {
                type: :string,
                format: :datetime
              },
              updated_at: {
                type: :string,
                format: :datetime
              },
              admin: {
                type: :boolean
              },
              phone_number: {
                type: :string
              },
              firstname: {
                type: :string
              },
              lastname: {
                type: :string
              },
              verified: {
                type: :boolean
              },
              slug: {
                type: :string
              },
              recently_joined?: {
                type: :boolean
              }
            }
          },
          articleIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              title: {
                type: :string
              },
              content: {
                type: :string
              },
              pinned: {
                type: :boolean
              },
              user_id: {
                type: :number
              }
            }
          },
          articleUpdate: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/articleIn' },
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ]
          },
          articleOut: {
            type: 'object',
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/articleIn' }
            ],
            properties: {
              id: {
                type: :number
              },
              image: {
                '$ref' => '#/components/schemas/attachmentBaseModel'
              },
              user: {
                '$ref' => '#/components/schemas/author'
              },
              comments: {
                type: :array,
                items: {
                  '$ref' => '#/components/schemas/commentOut'
                }
              }
            }
          },
          cabinAttachmentIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              cabin_in: {
                type: :number
              },
              image: {
                type: :string,
                format: :binary
              }
            }
          },
          cabinAttachmentOut: {
            allOf: [
              { '$ref' => '#/components/schemas/cabinAttachmentIn' },
              { '$ref' => '#/components/schemas/baseModel' }
            ]
          },
          cabinDateIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              cabin_id: {
                type: :number
              },
              startdate: {
                type: :string,
                format: :datetime
              },
              enddate: {
                type: :string,
                format: :datetime
              }
            }
          },
          cabinDateOut: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/cabinDateIn' }
            ]
          },
          cabinIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              name: {
                type: :string
              },
              bedrooms: {
                type: :number
              },
              washerdryer: {
                type: :boolean
              },
              dock: {
                type: :boolean
              },
              user_id: {
                type: :number
              },
              price_per_week: {
                type: :number
              },
              price_per_day: {
                type: :number
              },
              description: {
                type: :string
              }
            }
          },
          cabinOut: {
            type: 'object',
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/cabinIn' }
            ],
            properties: {
              id: {
                type: :number
              },
              cabindates: {
                type: :array,
                items: {
                  '$ref' => '#/components/schemas/cabinDateOut'
                }
              },
              cabin_attachments: {
                type: :array,
                items: {
                  '$ref' => '#/components/schemas/cabinAttachmentOut'
                }
              },
              user: {
                '$ref' => '#/components/schemas/author'
              }
            }
          },
          cabinUpdate: {
            allOf: [
              { '$ref' => '#/components/schemas/cabinOut' },
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ]
          },
          campMessageIn: {
            allOf: [
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ],
            properties: {
              message: {
                type: :string
              }
            }
          },
          campMessageOut: {
            allOf: [
              { '$ref' => '#/components/schemas/campMessageIn' },
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ]
          },
          chartIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              caption: {
                type: :string
              }
            }
          },
          chartOut: {
            allOf: [
              { '$ref' => '#/components/schemas/chartIn' },
              { '$ref' => '#/components/schemas/baseModel' }
            ],
            properties: {
              chart: {
                '$ref' => '#/components/schemas/attachmentBaseModel'
              },
              id: {
                type: :number
              },
              user: {
                '$ref' => '#/components/schemas/author'
              }
            }
          },
          commentIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              content: {
                type: :string
              },
              user_id: {
                type: :number
              },
              article_id: {
                type: :number
              }
            }
          },
          commentOut: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/commentIn' }
            ],
            properties: {
              id: {
                type: :number
              },
              author_email: {
                type: :string
              },
              author_username: {
                type: :string
              }
            }
          },
          committeeIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              url: {
                type: :string
              },
              name: {
                type: :string
              }
            }
          },
          committeeOut: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/committeeIn' }
            ]
          },
          documentIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              document_title: {
                type: :string
              },
              document_folder: {
                type: :string
              },
              document: {
                '$ref' => '#/components/schemas/attachmentBaseModel'
              }
            }
          },
          documentOut: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/documentIn' }
            ]
          },
          eventIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              title: {
                type: :string
              },
              location: {
                type: :string
              },
              description: {
                type: :string
              },
              start_time: {
                type: :string,
                format: :datetime
              },
              end_time: {
                type: :string,
                format: :datetime
              },
              user_id: {
                type: :number
              },
              all_day: {
                type: :boolean
              },
            }
          },
          eventOut: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/eventIn' }
            ],
            properties: {
              id: {
                type: :number
              },
              user: {
                '$ref' => '#/components/schemas/author'
              }
            }
          },
          eventUpdate: {
            allOf: [
              { '$ref' => '#/components/schemas/eventIn' },
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ]
          },
          familyTreeIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              name: {
                type: :string
              }
            }
          },
          familyTreeOut: {
            allOf: [
              { '$ref' => '#/components/schemas/baseModel' },
              { '$ref' => '#/components/schemas/familyTreeIn' }
            ],
            properties: {
              user: {
                '$ref' => '#/components/schemas/author'
              },
              family_members: {
                type: :array,
                items: {
                  '$ref' => '#/components/schemas/familyMemberOut'
                }
              }
            }
          },
          familyMemberIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              family_tree_id: {
                type: :number
              },
              name: {
                type: :string
              },
              relationship: {
                type: :string
              },
              parent_ids: {
                type: :array,
                items: {
                  type: :number
                }
              },
              date_of_birth: {
                type: :string,
                format: :datetime
              }
            }
          },
          familyMemberOut: {
            allOf: [{ '$ref' => '#/components/schemas/familyMemberIn' },
                    { '$ref' => '#/components/schemas/baseModel' }]
          },
          locationPointIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              location_name: {
                type: :string
              },
              location_description: {
                type: :string
              }
            }
          },
          locationPointOut: {
            allOf: [{ '$ref' => '#/components/schemas/locationPointIn' },
                    { '$ref' => '#/components/schemas/baseModel' }]
          },
          galleryIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              image: {
                type: :string,
                format: :binary
              },
              caption: {
                type: :string
              },
              user_id: {
                type: :number
              }
            }
          },
          galleryOut: {
            allOf: [{ '$ref' => '#/components/schemas/galleryIn' },
                    { '$ref' => '#/components/schemas/baseModel' }],
            properties: {
              image: {
                '$ref' => '#/components/schemas/attachmentBaseModel'
              },
              user: {
                '$ref' => '#/components/schemas/author'
              }
            }
          },
          rideshareIn: {
            allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
            properties: {
              user_id: {
                type: :number
              },
              number_of_passengers: {
                type: :number
              },
              additional_information: {
                type: :string
              },
              arriving_at: {
                type: :string
              },
              departing_at: {
                type: :string
              },
              point_of_arrival_id: {
                type: :string
              },
              point_of_departure_id: {
                type: :string
              },
              seeking: {
                type: :boolean
              }
            }
          },
          rideshareOut: {
            allOf: [{ '$ref' => '#/components/schemas/rideshareIn' },
                    { '$ref' => '#/components/schemas/baseModel' }],
            properties: {
              id: {
                type: :number
              },
              user: {
                '$ref' => '#/components/schemas/author'
              }
            }
          },
          rideshareUpdate: {
            allOf: [
              { '$ref' => '#/components/schemas/rideshareIn' },
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ]
          },
          userIn: {
            allOf: [
              { '$ref' => '#/components/schemas/createUpdateBaseModel' },
              { '$ref' => '#/components/schemas/baseModel' },
            ],
            properties: {
              username: {
                type: :string
              },
              phone_number: {
                type: :string
              },
              firstname: {
                type: :string
              },
              lastname: {
                type: :string
              },
              user_id: {
                type: :number
              }
            }
          },
          userUpdate: {
            allOf: [
              { '$ref' => '#/components/schemas/userIn' },
              { '$ref' => '#/components/schemas/createUpdateBaseModel' }
            ]
          },
          relationshipArray: {
            type: :array,
            items: {
              allOf: [{ '$ref' => '#/components/schemas/createUpdateBaseModel' }],
              properties: {
                child: { type: :string },
                parent: { type: :string }
              },
              required: %w[child parent]
            }
          },
          searchIn: {
            type: 'object',
            properties: {
              search: {
                type: :string
              }
            }
          }
        },
      },
      security: [ { Bearer: [] } ]
    }
  }

  config.openapi_format = :json
end
