# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
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
          articleIn: {
            type: 'object',
            properties: {
              title: {
                type: :string
              },
              content: {
                type: :string
              },
              image: {
                type: :string,
                format: :binary
              },
              pinned: {
                type: :boolean
              },
              user_id: {
                type: :number
              }
            }
          },
          cabinAttachmentIn: {
            type: 'object',
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
          cabinDateIn: {
            type: 'object',
            properties: {
              cabin_in: {
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
          cabinIn: {
            type: 'object',
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
          chartIn: {
            type: 'object',
            properties: {}
          },
          commentIn: {
            type: 'object',
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
          committeeIn: {
            type: 'object',
            properties: {
              url: {
                type: :string
              },
              name: {
                type: :string
              }
            }
          },
          documentIn: {
            type: 'object',
            properties: {
              document_title: {
                type: :string
              },
              document_folder: {
                type: :string
              },
              document: {
                type: :document
              }
            }
          },
          eventIn: {
            type: 'object',
            properties: {
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
              }
            }
          },
          familyMemberIn: {
            type: :array,
            items: {
              type: 'object',
              properties: {
                name: {
                  type: :string
                },
                relationship: {
                  type: :string
                },
                family_tree_id: {
                  type: :number
                },
                parent_id: {
                  type: :number
                }
              },
              required: %w[name, family_tree_id]
            }
          },
          familyTreeIn: {
            type: 'object',
            properties: {
              name: {
                type: :string
              }
            }
          },
          locationPointIn: {
            type: 'object',
            properties: {
              location_name: {
                type: :string
              },
              location_description: {
                type: :string
              }
            }
          },
          galleryIn: {
            type: 'object',
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
          passwordResetPayload: {
            type: 'object',
            properties: {}
          },
          rideshareIn: {
            type: 'object',
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
          userIn: {
            type: 'object',
            properties: {}
          },
          relationshipArray: {
            type: :array,
            items: {
              type: 'object',
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
        securitySchemes: {
          AuthToken: {
            type: :http, scheme: :bearer, bearerFormat: JWT
          }
        }
      }
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
