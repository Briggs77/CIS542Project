import crypto from 'crypto';

class HashManager 
{
  static generateHash(input: string, salt: number): string 
  {
    const saltedInput = input + salt.toString();
    return crypto.createHash('sha256').update(saltedInput).digest('hex');
  }

  static generateDefaultHash(input: string): string 
  {
    console.log('Input being hashed:', JSON.stringify(input)); 
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    console.log('Generated hash:', hash); 
    return hash;
  }
}

export default HashManager;