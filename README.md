# SLO Interactive Guide

An interactive web application that helps teams understand and implement Service-Level Objectives (SLOs) through hands-on learning tools and real-world examples.

## 🚀 Features

### Interactive Learning Tools
- **SLO Calculator**: Calculate error budgets and downtime implications for different SLO targets
- **Concept Explorer**: Interactive cards explaining SLIs, SLOs, and SLAs with detailed examples
- **Error Budget Simulator**: Simulate incidents and see how they affect your error budget
- **Case Studies**: Explore how companies like Spotify, Uber, and Etsy approach SLOs

### Key Capabilities
- Real-time SLO calculations with visual error budget representation
- Interactive comparison tables showing downtime implications
- Policy simulator with configurable thresholds
- Responsive design that works on all devices
- Accessibility features for inclusive learning

## 📖 What You'll Learn

Based on the comprehensive SLO report, this interactive guide covers:

1. **Foundational Concepts**: Understanding SLIs, SLOs, and SLAs
2. **Error Budgets**: How to calculate and manage error budgets effectively
3. **Implementation**: Step-by-step approach to setting up SLOs
4. **Real-world Examples**: How major companies implement SLOs
5. **Best Practices**: Avoiding common pitfalls and managing policies

## 🛠️ Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required - it's a static HTML/CSS/JS application

### Running Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/slo-demo-app.git
   cd slo-demo-app
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

3. Or serve it with a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. Open your browser and navigate to `http://localhost:8000`

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
3. **Push changes** to the `main` branch
   - The GitHub Action will automatically deploy your site
   - Your site will be available at `https://yourusername.github.io/slo-demo-app`

### Manual Deployment

1. **Enable GitHub Pages**:
   - Go to repository settings
   - Under "Pages" section, select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

2. **Your site will be available at**:
   `https://yourusername.github.io/slo-demo-app`

## 📁 Project Structure

```
slo-demo-app/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and responsive design
├── script.js               # JavaScript functionality
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── .nojekyll              # Tells GitHub Pages to skip Jekyll
└── README.md              # This file
```

## 🎯 How to Use

### 1. SLO Calculator
- Set your desired SLO target (e.g., 99.9%)
- Choose your time period (monthly, weekly, yearly)
- See real-time calculations of error budget and allowed downtime
- Compare different SLO targets side by side

### 2. Concept Explorer
- Click on SLI, SLO, or SLA cards to learn more
- Understand the differences between these concepts
- See practical examples for each

### 3. Case Studies
- Switch between Spotify, Uber, and Etsy tabs
- Learn how different business models affect SLO strategies
- Understand critical user journeys for each company

### 4. Error Budget Simulator
- Simulate incidents with different durations and frequencies
- Configure your error budget policy thresholds
- See how incidents affect your budget and trigger policy actions
- Learn when to implement feature freezes or critical responses

## 🔧 Customization

### Adding New Case Studies
1. Add a new tab button in the case study tabs section
2. Create a new tab content div with your company information
3. Update the JavaScript tab switching logic

### Modifying SLO Calculations
- Edit the `calculateSLO()` function in `script.js`
- Add new calculation methods or metrics
- Update the visualization functions as needed

### Styling Changes
- Modify `styles.css` for visual changes
- The design uses CSS Grid and Flexbox for responsive layouts
- Color scheme can be updated by changing the CSS custom properties

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📚 Educational Resources

This interactive guide is based on the comprehensive SLO report and incorporates best practices from:

- [Google SRE Book](https://sre.google/sre-book/service-level-objectives/)
- [Google SRE Workbook](https://sre.google/workbook/implementing-slos/)
- [SRE Fundamentals](https://cloud.google.com/blog/products/devops-sre/sre-fundamentals-slis-slas-and-slos)

## 🙏 Acknowledgments

- Based on the comprehensive SLO report provided
- Inspired by Google's Site Reliability Engineering practices
- Built with modern web technologies for optimal learning experience

## 📞 Support

If you have questions or need help:
1. Check the [Issues](https://github.com/yourusername/slo-demo-app/issues) page
2. Create a new issue with your question
3. Include details about your setup and what you're trying to achieve

---

**Happy Learning!** 🎉 Master SLOs and build more reliable systems with this interactive guide.
