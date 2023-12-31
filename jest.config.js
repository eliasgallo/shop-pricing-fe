module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@shared/(.*)$': '<rootDir>/src/shared/$1',
    '@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@images/(.*)$': '<rootDir>/src/images/$1',
    '@store/': '<rootDir>/src/store',
    '@types/': '<rootDir>/src/types',
    '@customHooks/(.*)$': '<rootDir>/src/customHooks/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  }
};
