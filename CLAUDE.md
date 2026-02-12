# Development guidance

- Above all else, keep it simple instead of clever
- Prefer to use functional, stateless approaches instead of relying on class magic
- Avoid magic whenever possible
- Add specs for any functional code changes. Avoid specs that exist solely to provide coverage
- Use `typed: strict` when possible. If too arduous, use `typed: true` in order to access sorbet typing

## Rails

- Use `concerns` judiciously and mix them into models where appropriate
