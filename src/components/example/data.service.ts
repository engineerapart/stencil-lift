export class DataService {
  async get(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return { data };
    } catch (error) {
      return { error };
    }
  }

  // Could define POST here too, but we don't need to post for this demo.
}
