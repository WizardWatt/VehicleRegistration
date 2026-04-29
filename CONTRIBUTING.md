# Contributing to Vehicle Registry Blockchain

First off, thank you for considering contributing to Vehicle Registry Blockchain! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to maintain a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, transaction hashes, etc.)
- **Describe the behavior you observed** and what you expected
- **Include screenshots or logs** if applicable
- **Specify your environment** (Hardhat version, Solidity version, network, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear use case** - Why is this enhancement needed?
- **Detailed description** - How should it work?
- **Possible implementation** - If you have ideas on how to implement it
- **Alternatives considered** - What other solutions did you think about?

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the coding standards
3. **Add tests** if you've added code that should be tested
4. **Update documentation** if you've changed APIs or functionality
5. **Ensure the test suite passes** (`npm test`)
6. **Make sure your code lints** (if we add linting)
7. **Write a clear commit message** following our commit conventions

## Development Setup

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/vehicle-registry-blockchain.git
cd vehicle-registry-blockchain
```

2. Install dependencies
```bash
npm install
```

3. Create a branch
```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and test
```bash
npm test
```

## Coding Standards

### Solidity Style Guide

Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html):

- Use 4 spaces for indentation
- Maximum line length of 120 characters
- Use explicit function visibility
- Document all public functions with NatSpec comments
- Use descriptive variable names

Example:
```solidity
/**
 * @notice Registers a new vehicle
 * @param _vehicleId Unique vehicle identifier
 * @param _ownerName Name of the vehicle owner
 */
function registerVehicle(
    string memory _vehicleId,
    string memory _ownerName
) public {
    // Implementation
}
```

### JavaScript/Testing Style

- Use modern JavaScript (ES6+)
- Use `const` and `let`, avoid `var`
- Use descriptive test names
- Group related tests in `describe` blocks
- Follow Arrange-Act-Assert pattern in tests

## Testing Guidelines

### Writing Tests

All new features must include tests. Tests should:

- Cover happy paths and edge cases
- Test error conditions and require statements
- Verify events are emitted correctly
- Check state changes accurately

Example test structure:
```javascript
describe("Feature Name", function () {
  beforeEach(async function () {
    // Setup
  });

  it("Should do something correctly", async function () {
    // Arrange
    // Act
    // Assert
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run coverage

# Run tests on specific file
npx hardhat test test/VehicleRegistry.test.js
```

## Commit Message Guidelines

Use clear and meaningful commit messages:

```
type: subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code refactoring
- `chore`: Maintenance tasks

Examples:
```
feat: add batch vehicle registration function

fix: prevent double spending in transfer function

docs: update README with deployment instructions

test: add edge case tests for ownership transfer
```

## Security

### Reporting Security Issues

**DO NOT** create public GitHub issues for security vulnerabilities.

Instead, please email [your-email@example.com] with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Best Practices

When contributing code:
- Never commit private keys or sensitive data
- Follow secure coding practices
- Consider reentrancy and other common vulnerabilities
- Use SafeMath or Solidity 0.8+ for arithmetic
- Validate all inputs
- Use require statements for access control

## Gas Optimization

When optimizing for gas:
- Document the optimization and gas savings
- Don't sacrifice readability for minor savings
- Include gas reports in PR description
- Consider trade-offs between deployment and runtime costs

## Documentation

### Code Documentation

- Add NatSpec comments to all public/external functions
- Document complex logic with inline comments
- Keep comments up-to-date with code changes

### Project Documentation

Update relevant documentation when you:
- Add new features
- Change APIs
- Modify deployment process
- Update dependencies

## Review Process

1. **Automated checks** - CI/CD must pass
2. **Code review** - At least one maintainer approval required
3. **Testing** - All tests must pass
4. **Documentation** - Must be complete and accurate
5. **Security review** - For sensitive changes

## Getting Help

- **Discord/Slack**: [Link to community chat]
- **GitHub Discussions**: For questions and general discussion
- **Stack Overflow**: Tag your question with `vehicle-registry-blockchain`

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes (for significant contributions)
- Credited in the project README

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Vehicle Registry Blockchain! 🚗⛓️
