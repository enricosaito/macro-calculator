import "@testing-library/jest-dom";

// Mock matchMedia for responsive designs
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    };
  };

// Mock Firebase
vi.mock("@/lib/firebase", () => ({
  auth: {
    onAuthStateChanged: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    useDeviceLanguage: vi.fn(),
    settings: {
      appVerificationDisabledForTesting: false,
    },
  },
  db: {},
}));
