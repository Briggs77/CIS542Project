class Metrics 
{

  getScreenResolution(): string 
  {
    const screenWidth = window.screen.width.toString();
    const screenHeight = window.screen.height.toString();
    return `${screenWidth}x${screenHeight}`;
  }

  getUserAgent(): string 
  {
    return navigator.userAgent;
  }

  getMetrics(): Record<string, string> 
  {
    const metrics: Record<string, string> = 
    {
      screenResolution: this.getScreenResolution(),
      userAgent: this.getUserAgent(),
    }

    return metrics;
  }

  getCurrentMs(): string 
  {
    return Date.now().toString(); 
  }

}

export default Metrics;
